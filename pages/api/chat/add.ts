import React from 'react'
import ConnectDB from '@/utils/ConnectDB';
import { ChatModel } from '@/utils/SchemaModels';

export default async (req:any, res:any) => {
    try {
	    //MongoDBに接続してユーザーが存在してるかチェックする
        await ConnectDB()
        let chat = await ChatModel.findOneAndUpdate({ id: req.body.id }, req.body, { new: true });
        if (!chat) { // chatが見つからなかった場合は新規作成します
            chat = await ChatModel.create(req.body);
        }
        return res.status(200).json({ message: "chat追加成功", created: true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "chat追加失敗" })
    }
}