import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json("Token không hợp lệ!");
        }

         req.user = user;
        next();
         }) ;

    } else {
        return res.status(401).json("Bạn chưa đăng nhập!");
    }
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.params.userId) {
            next();
        } else {
            return res.status(403).json("Bạn không thể thực hiện hành động này!");
        }
    });
};