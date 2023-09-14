import {Avatar, List, Rate, Skeleton, Tag} from 'antd';
import React, {useEffect, useState} from "react";
import axios from "axios";

interface Feedback {
    feedbackId: string,
    userId: string,
    name: string,
    avatar: string,
    date: string,
    tag: string,
    rate: string,
    content: string,
    phone: string
}


const Feedback: React.FC = () => {
    const [data, setData] = useState<Array<Feedback>>([])

    useEffect(() => {
        const fetchFeedbackList = async () => {
            const res = await axios.get(import.meta.env.VITE_END_ADDRESS + "/feedback/selectFeedbackList", {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            })
            const feedbackListRes = res.data as HttpResponse<Array<Feedback>>
            if (feedbackListRes.code === '200') {
                setData(feedbackListRes.data)
                console.log(data)
            }
        }
        fetchFeedbackList().then()
    }, [])

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.feedbackId}
                           actions={[<Tag color={item.tag === '问题' ? '#2db7f5' : '#87d068'}>{item.tag}</Tag>,
                               <Rate value={Number(item.rate)} disabled/>]}>
                    <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={<>
                                <a>{item.name}</a>&nbsp;
                                <span>({item.phone})</span>
                            </>}
                            description={item.content}
                        />
                        <div>{item.date}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default Feedback;