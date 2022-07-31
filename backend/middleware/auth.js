"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
const auth = async (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers.Authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?._id;
        }else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;      // sub === id
        }

        next();
    } catch (error) {
        console.log(error);
    }
}
*/ 
