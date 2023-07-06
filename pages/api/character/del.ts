import React from 'react'
import ConnectDB from '@/utils/ConnectDB';
import { CharacterModel } from '@/utils/SchemaModels';

export default async (req:any, res:any) => {
    try {
	    //MongoDBに接続してユーザーが存在してるかチェックする
        await ConnectDB()
        await CharacterModel.deleteOne({ _id: req.body.id })
        return res.status(200).json({ message: "キャラクター削除成功" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "キャラクター削除失敗" })
    }
}