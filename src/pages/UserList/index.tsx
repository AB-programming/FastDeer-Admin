import React from 'react';
import {Table, Avatar, Space} from 'antd';
import type {ColumnsType} from 'antd/es/table';

interface DataType {
    key: string;
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

const columns: ColumnsType<DataType> = [
    {
        title: '用户Id',
        key: 'key',
        dataIndex: 'key',
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
                <a>注销</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        nickName: 'John Brown',
        gender: '32',
        avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        place: 'New York No. 1 Lake Park',
        birth: '1992-10-02',
        school: '江西工业大学',
        major: '计算机科学与技术',
        qualification: '本科',
        graduationDate: '2022-01-01',
    },
    {
        key: '2',
        nickName: 'Jim Green',
        gender: '42',
        avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        place: 'London No. 1 Lake Park',
        birth: '1992-10-02',
        school: '江西工业大学',
        major: '计算本秘修',
        qualification: '本秘修',
        graduationDate: '2022-01-01',
    },
    {
        key: '3',
        nickName: 'Joe Black',
        gender: '32',
        avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        place: 'Sidney No. 1 Lake Park',
        birth: '1992-10-02',
        school: '江西工业大学',
        major: '计算本秘修',
        qualification: '本秘修',
        graduationDate: '2022-01-01',
    },
];
const UserList: React.FC = () => {
    return (
        <div>
            <Table columns={columns}
                   pagination={{position: ['bottomCenter'], pageSize: 10}}
                   dataSource={data}
            />
        </div>
    );
};

export default UserList;