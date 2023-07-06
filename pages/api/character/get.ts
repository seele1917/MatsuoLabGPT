import React from 'react'
import ConnectDB from '@/utils/ConnectDB';
import { CharacterModel } from '@/utils/SchemaModels';

export default async (req:any, res:any) => {
    try {
        await ConnectDB()
        let characters = await CharacterModel.find({ userId: req.body.userId })
        if (characters == null) {
            characters = []
        }
        return res.status(200).json({ message: "キャラクター取得成功", created: true, characters: characters})
    } catch (error) {
        return res.status(400).json({ message: "キャラクター取得失敗" })
    }
}