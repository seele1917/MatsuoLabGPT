import React from 'react';
import jwt from 'jsonwebtoken';
import ConnectDB from '@/utils/ConnectDB';
import { UserModel } from '@/utils/SchemaModels';

interface RequestBody {
  email: string;
  password: string;
}

export default async (req: { body: RequestBody }, res: any) => {
  try {
    // Receive data from the frontend
    const { email, password } = req.body;

    // Connect to MongoDB and find the user
    await ConnectDB();
    const saveUser = await UserModel.findOne({ email: email });
    // const saveUser = {
    //     username: 'test@test.com',
    //     password: 'testtest',
    // }
    if (saveUser) {
      if (password === saveUser.password) {
        // Issue a token using jsonwebtoken
        const token = jwt.sign(
          {
            id: saveUser._id,
            username: saveUser.username,
            email: email,
            isAdmin: saveUser.isAdmin,
          },
          process.env.NEXT_PUBLIC_SECRET_KEY as string,
          { expiresIn: '2m' }
        );

        return res.status(200).json({ message: 'ログイン成功', token: token });
      } else {
        return res.status(400).json({ message: 'パスワードが間違っています' });
      }
    } else {
      return res.status(400).json({ message: 'ユーザーが存在しません。登録してください' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'ログイン失敗' });
  }
};
