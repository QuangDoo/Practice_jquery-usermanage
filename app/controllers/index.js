$(document).ready(function () {
  // định nghĩa sự kiện click cho nút button #btnThemNguoiDung
  // xử lý cho sự kiện đó
  $("#btnThemNguoiDung").click(function () {
    // reset value input khi thực hiện chức năng thêm người dùng
    $(".txtF").val(" ");
    // tạo phần nội dung modal title
    var modalTitle = "Thêm người dùng";
    // tạo nội dung cho modal footer
    var modalFooter = `<button class="btn btn-outline-primary" id="btnThem">Thêm người dùng</button> 
         <button class="btn btn-outline-danger" id="close">Đóng</button> 
         `;
    $(".modal-title").html(modalTitle);
    $(".modal-footer").html(modalFooter);
    $("#modalPopup").trigger("click");
  });

  // xử lý sự kiện button đóng form popup
  $("body").delegate("#close", "click", function () {
    $("#btnClose").trigger("click");
  });
  var danhSachNguoiDung = new DanhSachNguoiDung();
  // xử lý tác vụ thêm người dùng
  $("body").delegate("#btnThem", "click", function () {
    // lấy thông tin người dùng
    var hoTen = $("#hoten").val();
    var taiKhoan = $("#taikhoan").val();
    var matKhau = $("#matkhau").val();
    var email = $("#email").val();
    var soDT = $("#sodt").val();
    // khởi tạo đối tượng người dùng
    var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);

    danhSachNguoiDung.ThemNguoiDung(nguoiDung);
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    // sau khi them nguoi dung vao thanh cong. se hien len dau tich : sweeralert, sau đó đóng form
    swal("OKE!", "Bạn đã thêm người dùng thành công!", "success");
    // đóng form
    $("#close").trigger("click");
    // reset thông tin người dùng sau khi thành công
    $(".txtF").val(" ");
    // lưu vào storage
    LuuLocalStorage();
  });
  // hien thi nguoi dung len table
  function LoadDanhSachNguoiDung(DSND) {
    var noiDungDSND = "";
    for (let i = 0; i < DSND.length; i++) {
      var nguoiDung = DSND[i];
      console.log(nguoiDung.hoTen);
      
      noiDungDSND += `
            <tr class="trThongTinNguoiDung" data-taikhoan="${nguoiDung.taiKhoan}" data-matkhau="${nguoiDung.matKhau}" 
            data-hoTen = "${nguoiDung.hoTen}"
            data-email ="${nguoiDung.email}"
            data-soDT = "${nguoiDung.soDT}"
            >
            <td> <input class="clbXoaNguoiDung" type="checkbox" value="${nguoiDung.taiKhoan}"/></td>
            <td class="tdThongTinNguoiDung">${nguoiDung.taiKhoan}</td>
            <td class="tdThongTinNguoiDung">${nguoiDung.matKhau}</td>
            <td class="tdHoTen tdThongTinNguoiDung">${nguoiDung.hoTen}</td>
            <td class="tdThongTinNguoiDung">${nguoiDung.email}</td>
            <td class="tdThongTinNguoiDung">${nguoiDung.soDT}</td>
            </tr>
        `;
    }
    $(".tblDSND").html(noiDungDSND);
  }
  // tim kiem nguoi dung
  $("#txtKey").keyup(function () {
    var key = $("#txtKey").val();
    var danhSachNguoiDungTimKiem = danhSachNguoiDung.TimKiemNguoiDung(key);
    LoadDanhSachNguoiDung(danhSachNguoiDungTimKiem.DSND);
    HighLight(key);
  });
  // hight key tim dc
  function HighLight(key) {
    var length = key.length;
    // duyet tat ca cac td co class tdHoTen
    $(".tdHoTen").each(function () {
      //lấy ra nội dung của kết quả
      var contentHTML = $(this).html();

      // kiểm tra trong nội dung html có thẻ td.hoten có chứa key hay ko
      if (contentHTML.indexOf(key) !== -1) {
        var vitriKey = contentHTML.indexOf(key);
        // dùng hàm substring để cắt chuỗi
        var ketQuaMoi = `${contentHTML.substring(
          0,
          vitriKey
        )} <span class="highlight">${key}</span> ${contentHTML.substring(
          vitriKey + length
        )}`;
        $(this).html(ketQuaMoi);
      }
    });
  }
  // luu local storage
  function LuuLocalStorage() {
    var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
    localStorage.setItem("DSND", jsonDSND);
  }
  function LayStorage() {
    if (localStorage.getItem("DSND")) {
      var jsonDSND = localStorage.getItem("DSND");
      danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
      LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    }
  }
  LayStorage();

  // Xử lý xóa người dùng
  $("#btnXoaNguoiDung").click(function () {
    $(".clbXoaNguoiDung").each(function () {
      if ($(this).is(":checked")) {
        var taiKhoan = $(this).val();
        danhSachNguoiDung.XoaNguoiDung(taiKhoan);
        console.log(taiKhoan);
      }
    });
    // load lai danh sach nguoi dung
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    LuuLocalStorage();
  });
  // Cài đặt sự kiện click cho dòng tr
  $("body").delegate(".tdThongTinNguoiDung", "click", function () {
    var This = $(this).closest(".trThongTinNguoiDung")
    // var This = $(this).parent()
    var taiKhoan = This.attr("data-taikhoan");
    var matKhau = This.attr("data-matkhau");
    var hoTen = This.attr("data-hoten");
    var email = This.attr("data-email");
    var soDT = This.attr("data-sodt");
    // gán dữ liệu vào input popup
    $("#taikhoan").val(taiKhoan);
    $("#matkhau").val(matKhau);
    $("#hoten").val(hoTen);
    $("#email").val(email);
    $("#sodt").val(soDT);
    // goi popup hien thi
    $("#modalPopup").trigger("click");
    // tao hai button save va dong
    var modalTitle = "Cập nhật thông tin";
    // tạo nội dung cho modal footer
    var modalFooter = `<button class="btn btn-outline-primary" id="btnSave">Lưu thông tin</button> 
         <button class="btn btn-outline-danger" id="close">Đóng</button> 
         `;
    $(".modal-title").html(modalTitle);
    $(".modal-footer").html(modalFooter);
    // khoa input #taikhoan
    // $("#taikhoan").attr("readonly", true);
  });

  // xu ly cap nhat du lieu thông qua btnSave
  $("body").delegate("#btnSave", "click", function () {
    // lấy dữ liệu mới để cập nhật
    var taiKhoan = $("#taikhoan").val();
    var matKhau = $("#matkhau").val();
    var hoTen = $("#hoten").val();
    var email = $("#email").val();
    var soDT = $("#sodt").val();
    // tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi.
    var nguoiDungEdit = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
    // gọi phương thức cập nhật từ DanhSachNguoiDung.
    danhSachNguoiDung.CapNhatThongTinNguoiDung(nguoiDungEdit);
    // load table nguoiDung
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    swal("DONE!", "Bạn đã cập nhật người dùng thành công!", "success");
    // đóng form
    $("#close").trigger("click");
    //  lưu storage
    LuuLocalStorage();
  });
});
