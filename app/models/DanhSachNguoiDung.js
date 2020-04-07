function DanhSachNguoiDung() {
  this.DSND = [];
  this.ThemNguoiDung = function (nguoidung) {
    this.DSND.push(nguoidung);
  };
  // tim kiem nguoi dung theo hoTen
  this.TimKiemNguoiDung = function (key) {
    // loai bo khoang trang: trim()
    key = key.trim();
    // chuyen chuoi thanh chu thuong: toLowerCase
    key = key.toLowerCase();
    // tao doi tuong danhSachNguoiDungTimKiem
    var danhSachNguoiDungTimKiem = new DanhSachNguoiDung();
    for (let i = 0; i < this.DSND.length; i++) {
      var nguoiDung = this.DSND[i];
      if (nguoiDung.hoTen.toLowerCase().trim().search(key) !== -1) {
        danhSachNguoiDungTimKiem.ThemNguoiDung(nguoiDung);
      }
    }
    return danhSachNguoiDungTimKiem;
  };
  // tìm người dung theo taiKhoan
  this.TimNguoiDungTheoTaiKhoan = function (taiKhoan) {
    for (let i = 0; i < this.DSND.length; i++) {
      var nguoiDung = this.DSND[i];
      // so sanh nguoi dung trong mang voi taiKhoan. neu trung return i.
      if (nguoiDung.taiKhoan === taiKhoan) {
        return i;
      }
    }
    return -1;
  };
  // Phuong thuc xoa nguoi dung
  this.XoaNguoiDung = function (taiKhoan) {
    // tim vi tri cua nguoi dung trong mang DSND (this.DSND)
    var index = this.TimNguoiDungTheoTaiKhoan(taiKhoan);
    //tim dc index
    if (index !== -1) {
      this.DSND.splice(index, 1);
    }
  };
  // Phương thức chỉnh sửa người dùng
  this.CapNhatThongTinNguoiDung = function (nguoiDungEdit) {
    // tim vi tri cua nguoi dung trong mang DSND (this.DSND)
    var index = this.TimNguoiDungTheoTaiKhoan(nguoiDungEdit.taiKhoan);
    console.log(nguoiDungEdit.taiKhoan);
    
    var nguoiDungCapNhat = this.DSND[index];
    nguoiDungCapNhat.hoTen = nguoiDungEdit.hoTen;
    nguoiDungCapNhat.matKhau = nguoiDungEdit.matKhau;
    nguoiDungCapNhat.email = nguoiDungEdit.email;
    nguoiDungCapNhat.soDT = nguoiDungEdit.soDT;
  };
}
