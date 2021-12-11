const express = require('express');
const router = express.Router();

const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");

const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

// STROAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploadimg/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only png, jpg are allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Post
//=================================

router.post("/uploadfiles", (req, res) => {
    //이미지를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post("/uploadPost", (req, res) => {
    //이미지 정보들을 저장한다.
    const post = new Post(req.body)

    post.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
    
})

router.post("/getPostDetail", (req, res) => {
    //이미지를 DB에서 가져와서 클라이언트에 보낸다.

    Post.findOne({ "_id": req.body.postId})
        .populate('writer')
        .exec((err, postDetail) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, postDetail })
        })
});

router.get("/getPosts", (req, res) => {
    //이미지를 DB에서 가져와서 클라이언트에 보낸다.

    Post.find()
        .populate('writer')
        .exec((err, posts) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts })
        })

});

router.post("/getSubscriptionPosts", (req, res) => {
    //자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec(( err, subscriberInfo ) => {
            if(err) return res.status(400).send(err);

            let subscribedUser = [];

            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
            })


            //찾은 사람들의 비디오를 가지고 온다.
            Post.find({ writer: { $in: subscribedUser }})
                .populate('writer')
                .exec((err, posts) => {
                    if(err) return res.status(400).send(err);
                    res.status(200).json({ success: true, posts })
                })
        }) 
});

router.post("/thumbnail", (req, res) => {
    //썸네일 생성
    let filePath = ""
    let fileDuration = ""
    
    //이미지 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.dir(metadata); //all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploadimg/thumbnails/" + filenames[0]
    })
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration });
    })
    .on('error', function(err) {
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({
        // Will take screenshots at 20%, 40%, 60% and 80% of the video
        count: 3,
        folder: 'uploadimg/thumbnails',
        size: '320x240',
        //'%b': input basename(filename w/o extension)
        filename: 'thumbnail-%b.png'
    })

})

module.exports = router;