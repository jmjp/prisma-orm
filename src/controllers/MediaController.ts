import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { MediaService } from "../services/MediaService";
import fs from 'fs';

class MediaController{
    async upload(req: Request, res: Response){
        console.log(req.file!.buffer);
        try{
            const uuid =  uuidv4();
            var response = await MediaService.upload({
                file: req.file!.buffer,
                fileName: req.file?.originalname!,
                useUniqueFileName: true,           
                folder: `highlights/${req.params.name}/${req.body.user}`
            });
            return res.json(response);        
        }catch(error){
            return res.status(400).json(error);
        }
    }
}

export { MediaController }