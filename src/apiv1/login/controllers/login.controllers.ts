
import fs from 'fs';
import User from '../models/login.models';
import { Request, Response } from 'express';

const setUser = async (req: Request, res: Response) => {
    if (req.session.id) {
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>expires in: ' + req.session.cookie.expires + '</p>')
        res.write('<p>Session ID: ' + req.session.id + '</p>')
        res.end()
    } else
        return res.status(200).send(`welcome to the session ${req.session.id} refresh!`);
};
const getUser = async (req: Request, res: Response) => {
    let userEmail = await new User(req.session).getEmail();
    return res.status(200).json({ data: userEmail });

}

export { setUser, getUser };
