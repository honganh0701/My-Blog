import multer from 'multer'
import path from 'path';;

//cấu hình nơi lưu trữ file (Storage Configuration)
const storage = multer.diskStorage({
    //định nghĩa thư mục lưu file
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
        //callback v[is nll(không có lỗi) và tên thư mục
    },
        // - req: Request object
    // - file: Thông tin file upload
    // - cb: Callback function để xử lý kết quả
    // Nếu không có này, file sẽ không biết lưu vào đâu

    //định nghĩa tên file khi lưu
    filename: (req, file, cb) => {
        //tên file = timestamp + đên gốc để tránh trùng
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
// - Date.now(): Timestamp hiện tại
// - Math.random(): Số ngẫu nhiên để tránh trùng tên
// - path.extname: Lấy đuôi file (.jpg, .png,...)
// Nếu không có này, các file upload sẽ có thể bị trùng tên

//tạo filter cho file(file filter)
const fileFilter = (req, file, cb) => {
    //file type allowed
    const allowedTypes = /jpeg|jpg|png|gif/;
    // Kiểm tra cả extension và mimetype để đảm bảo an toàn
    // Nếu không có filter, user có thể upload file độc hại

    //kiểm tra extension và mimetype
    const extname = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = allowTypes.test(file.mimetype);

    if(extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh'), false);
    }
};

//khởi tạo middleware multer (multer configuration)
 // Nếu không có giới hạn dung lượng, user có thể upload file quá lớn
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fieldSize: 5 * 1024 * 1024 // 5MB
    }
});

export default upload;