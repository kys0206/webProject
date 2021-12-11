const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Course } = require("../models/Course");

//=================================
//             Course
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadcourse/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //가져온 이미지를 저장
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어 준다.
    const course = new Course(req.body)

    course.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/courses', (req, res) => {
    // course collection에 들어 있는 모든 상품 정보를 가져오기 
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};

    for (let key in req.body.filters) { //key : continents 또는 places
        if (req.body.filters[key].length > 0) {

            console.log('key', key)

            if (key === "places") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

        }
    }

    if (term) {
        Course.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, courseInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, courseInfo,
                    postSize: courseInfo.length
                })
            })
    } else {
        Course.find(findArgs)
	// populate : writer의 모든 정보를 가져온다
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip) // 처음상태 : 0 n번째 가져와라
            .limit(limit)
            .exec((err, courseInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, courseInfo,
                    postSize: courseInfo.length
                })
            })
    }

})

//id=123123123,324234234,324234234  type=array
router.get('/courses_by_id', (req, res) => {

    let type = req.query.type
    let courseIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //courseIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        courseIds = ids.map(item => {
            return item
        })
    }

    //courseId를 이용해서 DB에서  courseId를 같은 상품의 정보를 가져온다.
    Course.find({ _id: { $in: courseIds } })
        .populate('writer')
        .exec((err, course) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(course)
        })
})

// id가 여러개일 경어 array가 된다
router.get('/courses_by_id', (req, res) => {
    // courseId를 이용해서 DB에서 courseId와 같은 상품의 정보를 가져온다.

    let type = req.query.type
    let courseIds = req.query.id

    if(type === "array") {
        let ids = req.query.id.split(',')
        courseIds = ids.map(item => {
            return item
        })
    }

    Course.find({ _id: { $in: courseIds } })
        .populate('writer')
        .exec((err, course) => {
            if(err) return res.status(400).send(err)
            return res.status(200).send({ success: true, course })
        })

})


module.exports = router;