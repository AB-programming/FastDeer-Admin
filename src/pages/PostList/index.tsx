import type Icon from '@ant-design/icons';
import {EyeOutlined, LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import {Avatar, Col, List, Pagination, Row, Skeleton} from 'antd';
import axios from "axios";

interface IconTextProps {
    icon: typeof Icon;
    text: React.ReactNode;
}

const listData = Array.from({length: 4}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i + 1}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText: React.FC<IconTextProps> = ({icon, text}) => (
    <>
        {React.createElement(icon, {style: {marginRight: 8}})}
        {text}
    </>
);

const PostList: React.FC = () => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(50);
        const initPost = async () => {
            const res = await axios.get('http://localhost:8080/post/selectPostPage?current=1&size=4');
            console.log(res.data)
        };
        initPost().then();
    }, []);

    const changePage = (page: number, pageSize: number) => {
        console.log(page, pageSize)
        const changePagePost = async () => {
            const res = await axios.get('http://localhost:8080/post/selectPostPage?current=' + page + '&size=4')
            console.log(res.data)
        }
        changePagePost().then();
    }

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={
                            [
                                <IconText icon={EyeOutlined} text="156" key="list-vertical-eye-o"/>,
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                            ]
                        }
                        extra={
                            (
                                <>
                                    <Row gutter={[16, 24]}>
                                        <Col className="gutter-row" span={8}>
                                            <img
                                                width={180}
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={8}>
                                            <img
                                                width={180}
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={8}>
                                            <img
                                                width={180}
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            />
                                        </Col>
                                    </Row>
                                </>
                            )
                        }
                    >
                        <Skeleton loading={false} active avatar>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination
                style={{display: 'flex', justifyContent: 'center'}}
                defaultCurrent={1}
                defaultPageSize={1}
                total={page}
                showQuickJumper
                showSizeChanger={false}
                onChange={changePage}
            />
        </>
    );
};

export default PostList;