import React, {useEffect, useState} from 'react';
import {Table, Avatar, Space, Popconfirm, notification} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import axios from "axios";
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";

interface DataType {
    key: string;
    id: string;
    nickName: string;
    gender: string;
    avatarUrl: string;
    place: string;
    birth: string;
    school: string;
    major: string;
    qualification: string;
    graduationDate: string;
}

const UserList: React.FC = () => {

    const [data, setData] = useState<DataType[]>([]);
    const [api, contextHolder] = notification.useNotification()

    useEffect(() => {
        const init = async () => {
            const res = await axios.get(import.meta.env.VITE_END_ADDRESS + '/admin/selectAllUser', {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            })
            const usersRes = res.data as HttpResponse<Array<DataType>>
            if (usersRes.code === '200') {
                const newData = usersRes.data.map(item => ({
                    ...item,
                    key: item.id
                }))
                setData(newData)
            }
        }
        init().then()
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: '用户Id',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: '头像',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (url) => <Avatar size={"large"} src={url}/>
        },
        {
            title: '居住地',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            key: 'birth',
        },
        {
            title: '学校',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: '专业',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: '毕业时间',
            dataIndex: 'graduationDate',
            key: 'graduationDate',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="注销账户"
                        description={`确认注销${record.nickName}(${record.id})吗?`}
                        onConfirm={() => remove(record.id)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a>注销</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const openNotification = (loginFlag: boolean, loginRes: HttpResponse<boolean>) => {
        api.open({
            message: loginRes.msg,
            icon: loginFlag ? <SmileOutlined style={{color: '#108ee9'}}/> : <FrownOutlined style={{color: '#e32417'}}/>
        })
    }

    const remove = async (openId: string) => {
        try {
            const res = await axios.delete(import.meta.env.VITE_END_ADDRESS + '/admin/removeUserById', {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                },
                data: {
                    openId
                }
            })
            const removeUserRes = res.data as HttpResponse<boolean>
            if (removeUserRes.code === '200' && removeUserRes.data) {
                setData(data.filter(user => user.id !== openId))
            }
            openNotification(removeUserRes.data, removeUserRes)
        } catch (e) {
            api.open({
                message: '网络错误，请稍后再试'
            })
        }
    }

    return (
        <div>
            <>
                {contextHolder}
                <Table columns={columns}
                       pagination={{position: ['bottomCenter'], pageSize: 10}}
                       dataSource={data}
                />
            </>
        </div>
    );
};

export default UserList;