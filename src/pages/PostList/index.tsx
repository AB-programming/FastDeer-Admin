import type Icon from '@ant-design/icons';
import {
    EyeOutlined,
    FrownOutlined,
    LikeOutlined,
    MessageOutlined,
    SmileOutlined,
    StarOutlined
} from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import {Avatar, Col, List, Pagination, Row, Skeleton, Button, Popconfirm, notification} from 'antd';
import axios from "axios";

interface IconTextProps {
    icon: typeof Icon;
    text: React.ReactNode;
}

export interface UserInfo {
    userId: string,
    name: string,
    avatar: string,
    role: string, // 身份
    socialInfo: {
        likes: number,
        fans: number,
        following: number
    },
    baseInfo: {
        gender: string,
        address: string
    },
    schoolInfo: {
        schoolName: string,
        degree: string,
        major: string,
        graduation: string // 毕业时间
    },
}

export type SocialStats = {
    browserCount: number, // 浏览量
    likeCount: number, // 点赞量
    bookmarkCount: number, // 收藏量
    isLike: boolean, // 点赞
    isBookmark: boolean, // 收藏
}

export interface Post {
    postId: string,
    date: string, // 帖子日期
    content: {
        urls: Array<string>, // 图片地址
        text: string,
        title: string
    },
    socialStats: SocialStats
    userInfo: UserInfo,
    commentCount: number
}

const IconText: React.FC<IconTextProps> = ({icon, text}) => (
    <>
        {React.createElement(icon, {style: {marginRight: 8}})}
        {text}
    </>
);

const getPageCount = (postCount: number) => (Math.floor(postCount / 4) + 1) * 4 > postCount ?
    Math.floor(postCount / 4) + 1 :
    Math.floor(postCount / 4);

const PostList: React.FC = () => {
    const [listData, setListData] = useState<Array<Post>>([]);
    const [api, contextHolder] = notification.useNotification()
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        const getPostCount = async () => {
            const res = await axios.get(import.meta.env.VITE_END_ADDRESS + '/admin/getPostCount', {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            });
            const getPageCountRes = res.data as HttpResponse<number>
            setPageCount(getPageCount(getPageCountRes.data))
        }
        getPostCount().then();
        const initPost = async () => {
            const res = await axios.get(import.meta.env.VITE_END_ADDRESS + '/post/selectPostPage?current=1&size=4');
            const initPostRes = res.data as HttpResponse<Array<Post>>
            setListData(initPostRes.data)
        };
        initPost().then();
    }, []);

    const changePage = (page: number) => {
        const changePagePost = async () => {
            const res = await axios.get('http://localhost:8080/post/selectPostPage?current=' + page + '&size=4')
            const changePostRes = res.data as HttpResponse<Array<Post>>
            setListData(changePostRes.data)
        }
        changePagePost().then();
    }

    const dropPost = async (postId: string) => {
        try {
            const res = await axios.delete(import.meta.env.VITE_END_ADDRESS  + '/post/deletePostByPostId?postId=' + postId, {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                },
                data: postId
            })
            const dropPostRes = res.data as HttpResponse<boolean>
            if (dropPostRes.code === '200' && dropPostRes.data) {
                const newListData = listData.filter(post => post.postId !== postId)
                setListData(newListData)
                openNotification(true, dropPostRes)
            } else {
                openNotification(false, dropPostRes)
            }
        } catch (e) {
            api.open({
                message: '网络错误，请稍后再试'
            })
        }
    }

    const openNotification = (loginFlag: boolean, loginRes: HttpResponse<boolean>) => {
        api.open({
            message: loginRes.msg,
            icon: loginFlag ? <SmileOutlined style={{color: '#108ee9'}}/> : <FrownOutlined style={{color: '#e32417'}}/>
        })
    }

    return (
        <>
            {contextHolder}
            <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={(item) => (
                    <List.Item
                        key={item.postId}
                        actions={
                            [
                                <IconText icon={EyeOutlined} text={item.socialStats.browserCount}
                                          key="list-vertical-eye-o"/>,
                                <IconText icon={StarOutlined} text={item.socialStats.bookmarkCount}
                                          key="list-vertical-star-o"/>,
                                <IconText icon={LikeOutlined} text={item.socialStats.likeCount}
                                          key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message"/>,
                            ]
                        }
                        extra={
                            (
                                <Row gutter={[16, 24]}>
                                    {item.content.urls.map((url, index) => (
                                        <Col className="gutter-row" span={8} key={index}>
                                            <img
                                                width={160}
                                                height={160}
                                                alt="logo"
                                                src={url}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )
                        }
                    >
                        <Skeleton loading={false} active avatar>
                            <List.Item.Meta
                                avatar={<Avatar src={item.userInfo.avatar}/>}
                                title={<a>{item.userInfo.name}</a>}
                                description={`${item.date} | ${item.userInfo.schoolInfo.schoolName} | ${item.userInfo.schoolInfo.major}`}
                            />
                            <h3>{item.content.title}</h3>
                            <p>{item.content.text}</p>
                            <Popconfirm
                                title="删除帖子"
                                description={`确认删除${item.postId}(${item.userInfo.userId} - ${item.userInfo.name})`}
                                onConfirm={() => dropPost(item.postId)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Button type={'primary'} danger>删除帖子</Button>
                            </Popconfirm>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination
                style={{display: 'flex', justifyContent: 'center'}}
                defaultCurrent={1}
                defaultPageSize={1}
                total={pageCount}
                showQuickJumper
                showSizeChanger={false}
                onChange={changePage}
            />
        </>
    );
};

export default PostList;