let currentSeatCode = "";
let isSeatValid = false;
let totalRevenue = 0;
let totalTrips = 0;

while (true) {
    let choice = prompt(
        "HỆ THỐNG BÁN VÉ NHÀ XE GREENLINE BUS" +
        "1. Nhập và kiểm chuẩn mã đặt chỗ" +
        "2. Tính tiền vé xe khách" +
        "3. Thẩm định mã vé xe may mắn" +
        "0. Thoát chương trình" +
        "Vui lòng nhập lựa chọn của bạn (0 - 3):"
    );

    if (choice === null) {
        console.log("Lựa chọn không hợp lệ");
        continue;
    }

    choice = choice.trim();

    if (choice === "0") {
        console.log("Cảm ơn bạn đã sử dụng hệ thống GreenLine Bus!");
        break;
    }

    switch (choice) {
        case "1":
            currentSeatCode = "";
            isSeatValid = false;

            let seatCode = prompt("Nhập mã đặt chỗ:");

            if (seatCode === null) {
                console.log("Chưa nhập mã đặt chỗ");
                break;
            }

            seatCode = seatCode.trim().toUpperCase();

            if (seatCode === "") {
                console.log("Chưa nhập mã đặt chỗ");
                break;
            }

            if (seatCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                break;
            }

            if (!seatCode.startsWith("BUS-")) {
                console.log('Lỗi: Sai tiền tố "BUS-"');
                break;
            }

            if (seatCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
                break;
            }

            currentSeatCode = seatCode;
            isSeatValid = true;

            console.log("Mã đặt chỗ hợp lệ: " + currentSeatCode);
            break;

        case "2":
            if (isSeatValid === false) {
                console.log("Vui lòng chọn Case 1 để nhập mã đặt chỗ hợp lệ trước");
                break;
            }

            let seatCount;
            let pricePerSeat;

            while (true) {
                let input = prompt("Nhập số ghế:");

                if (input === null) {
                    break;
                }

                seatCount = Number(input);

                if (
                    input.trim() === "" ||
                    isNaN(seatCount) ||
                    !Number.isInteger(seatCount) ||
                    seatCount <= 0
                ) {
                    console.log("Lỗi: Số ghế phải là số nguyên > 0");
                } else {
                    break;
                }
            }

            if (seatCount === undefined) {
                break;
            }

            while (true) {
                let input = prompt("Nhập giá vé mỗi ghế:");

                if (input === null) {
                    break;
                }

                pricePerSeat = Number(input);

                if (
                    input.trim() === "" ||
                    isNaN(pricePerSeat) ||
                    !Number.isInteger(pricePerSeat) ||
                    pricePerSeat <= 0
                ) {
                    console.log("Lỗi: Giá vé phải là số nguyên > 0");
                } else {
                    break;
                }
            }

            if (pricePerSeat === undefined) {
                break;
            }

            let baseCost = seatCount * pricePerSeat;
            let discount = 0;

            if (seatCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }

            let serviceFee = Math.round((baseCost - discount) * 0.08);
            let total = baseCost - discount + serviceFee;

            console.log("===== HÓA ĐƠN =====");
            console.log("Mã đặt chỗ: " + currentSeatCode);
            console.log("Số ghế: " + seatCount);
            console.log("Giá vé mỗi ghế: " + pricePerSeat + " VNĐ");
            console.log("Chi phí cơ sở: " + baseCost + " VNĐ");
            console.log("Tiền giảm giá: " + discount + " VNĐ");
            console.log("Phí dịch vụ trung chuyển: " + serviceFee + " VNĐ");
            console.log("Tổng thanh toán: " + total + " VNĐ");

            totalRevenue += total;
            totalTrips++;

            currentSeatCode = "";
            isSeatValid = false;
            break;

        case "3":
            let ticket = prompt("Nhập mã số trên vé:");

            if (ticket === null) {
                console.log("Lỗi: Mã vé không hợp lệ");
                break;
            }

            ticket = ticket.trim();

            if (
                ticket.length < 2 ||
                !/^[0-9]+$/.test(ticket) ||
                /^0+$/.test(ticket)
            ) {
                console.log("Lỗi: Mã vé không hợp lệ");
                break;
            }

            let reversed = ticket.split("").reverse().join("");
            let digitSum = 0;

            for (let i = 0; i < ticket.length; i++) {
                digitSum += Number(ticket[i]);
            }

            let isPalindrome = ticket === reversed;
            let divisibleBy9 = digitSum % 9 === 0;

            let prize = "Không trúng thưởng";

            if (isPalindrome && divisibleBy9) {
                prize = "Giải Đặc biệt - Vé khứ hồi miễn phí trị giá 600.000 VNĐ";
            } else if (isPalindrome) {
                prize = "Giải Nhất - Nâng hạng ghế giường nằm VIP trị giá 150.000 VNĐ";
            } else if (divisibleBy9) {
                prize = "Giải Nhì - Voucher giảm 20.000 VNĐ cho chuyến đi kế tiếp";
            }

            console.log("===== KẾT QUẢ =====");
            console.log("Mã số gốc: " + ticket);
            console.log("Mã đảo ngược: " + reversed);
            console.log("Tổng chữ số: " + digitSum);
            console.log("Chia hết cho 9: " + (divisibleBy9 ? "Có" : "Không"));
            console.log("Giải thưởng: " + prize);
            break;

        default:
            console.log("Lỗi: Lựa chọn không hợp lệ");
            break;
    }
}