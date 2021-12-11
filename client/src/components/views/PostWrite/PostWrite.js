import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "관광지"},
    {value: 1, label: "명소"},
    {value: 2, label: "공원"},
    {value: 3, label: "음식점"},
    {value: 4, label: "카페"}
]

function PostWrite(props) {
    const user = useSelector(state => state.user);
    const [PostTitle, setPostTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setPostTitle(e.currentTarget.value)
    }
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }    

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/post/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)

                let variable = { 
                    url: response.data.url,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.url)

                Axios.post('/api/post/thumbnail', variable)
                    .then(response => {
                        if(response.data.success) {

                            setDuration(response.data.fileDuration)
                            setThumbnailPath(response.data.url)
                            
                        } else {
                            alert('썸네일 생성에 실패했습니다.')
                        }
                    })

            } else {
                alert('이미지 업로드를 실패했습니다.')
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: PostTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            thumbnail: ThumbnailPath,
        }

        Axios.post('/api/post/uploadPost', variables)
            .then(response => {
                if(response.data.success) {
                    message.success('성공적으로 업로드를 했습니다.')
                    
                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000);
                    
                } else {
                    alert('이미지 업로드에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={3}>인기 게시물 작성</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize: '3rem' }} />

                                </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    
                    {ThumbnailPath && 
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="ThumbnailPath" />
                        </div>
                    }

                </div>

                <br/>
                <br/>
                <label>제목&emsp;&emsp;&emsp;</label>
                <input
                    onChange={onTitleChange}
                    value={PostTitle}
                />
                <br/>
                <br/>

                <label>설명</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>

                <label>개인 옵션&nbsp;&nbsp;</label>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>

                <label>분류&emsp;&emsp;&emsp;</label>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <br/>

                <Button type="primary" size="large" onClick={onSubmit}>
                    작성하기
                </Button>

            </Form>
        </div>
    )
}

export default PostWrite