import { fontSize } from "@mui/system";
import pdfMake, { fonts } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export async function makeDeliveryReceipt(order) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const documentDefinition = {
    pageOrientation: "landscape",
    content: [
      {
        columns: [
          {
            columns: [
              {
                text: "MAGIC POST",
                width: "*",
                fontSize: 40,
                margin: [0, 0, 0, 0],
                alignment: "left",
              },
            ],
            columnGap: 10,
            width: "70%",
          },
          {
            qr: "https://google.com/",
            fit: "90",
            width: "30%",
            alignment: "right",
            margin: [0, -20, 17, 0],
          },
        ],
      },
      {
        text: `${order.orderId}\n\n`,
        alignment: "right",
        margin: [0, -8, 20, 0],
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              {
                text: [
                  {
                    text: `1. Họ tên địa chỉ người gửi:\n`,
                    bold: true,
                  },
                  `${order.senderName} 
                  ${order.senderAddress} \n\n`,
                  { text: `Điện thoại: `, bold: true },
                  `${order.senderPhone}`,
                ],
                fontSize: 11,
              },
              {
                text: [
                  {
                    text: `2. Họ tên địa chỉ người nhận:\n`,
                    bold: true,
                  },
                  `${order.recipientName}
                                    ${order.recipientAddress} \n\n`,
                  { text: `Điện thoại: `, bold: "true" },
                  `${order.recipientPhone}`,
                ],
                fontSize: 11,
              },
            ],
            [
              {
                text: [
                  {
                    text: `3. Loại hàng gửi:\n`,
                    bold: true,
                  },
                  `${order.type === "document" ? "Tài liệu" : "Hàng hóa"}`,
                ],
                fontSize: 11,
              },
              [
                { text: "4. Khối lượng (kg):\n", bold: true, fontSize: 11 },
                {
                  columns: [
                    {
                      text: `Khối lượng: ${order.weight}\n`,
                    },
                  ],
                  fontSize: 11,
                },
              ],
            ],
            [
              [
                { text: "5. Cước:\n", bold: true, fontSize: 11 },
                {
                  columns: [
                    {
                      text: `a. Cước chính: ${order.mainCharge}
                                                b. Phụ phí: ${order.subCharge}
                                                c. Cước GTGT: ${order?.gtgt || 0}`,
                      width: "auto",
                    },
                    {
                      text: [
                        { text: `f. Tổng thu: `, bold: true },
                        `${+order.mainCharge + +order.subCharge + (order?.gtgt || 0)}`,
                      ],
                      width: "*",
                    },
                  ],
                  columnGap: 60,
                  fontSize: 11,
                },
              ],
              {
                text: [
                  {
                    text: `6. Thu của người nhận:\n`,
                    bold: true,
                  },
                  `COD: ${order.cod}
                                    Thu khác: ${+order.recipientFees?.additional || 0}\n`,
                  { text: `Tổng thu: `, bold: true },
                  `${+order.cod + (+order.recipientFees?.additional || 0)}`,
                ],
                fontSize: 11,
              },
            ],
            [
              {
                text: [
                  {
                    text: `7. Cam kết của người gửi:\n`,
                    bold: true,
                  },
                  `Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được tôi sẽ trả cước chuyển khoản`,
                ],
                fontSize: 11,
              },
              {
                text: [
                  {
                    text: `8. Bưu cục chấp nhận\n`,
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: `Chữ ký GDV nhận\n\n\n\n\n\n\n\n`,
                    alignment: "center",
                  },
                ],
                fontSize: 11,
              },
            ],
            [
              {
                columns: [
                  {
                    text: [
                      {
                        text: `9. Ngày giờ gửi:\n`,
                        bold: true,
                      },
                      `${new Date(order.dateCreated).toLocaleDateString("vi-VN")}`,
                    ],
                    fontSize: 11,
                  },
                  {
                    text: [
                      {
                        text: `Chữ ký của người gửi:\n`,
                        bold: true,
                      },
                    ],
                    fontSize: 11,
                  },
                ],
              },
              {
                columns: [
                  {
                    text: [
                      {
                        text: `10. Ngày giờ nhận:\n`,
                        bold: true,
                      },
                      `...../...../20....., ...........`,
                    ],
                    width: "auto",
                    fontSize: 11,
                  },
                  {
                    text: `Người nhận/Người được ủy quyển nhận
                                            (Ký, ghi rõ họ tên)\n\n\n\n\n\n\n\n`,
                    width: "*",
                    alignment: "center",
                    fontSize: 11,
                  },
                ],
              },
            ],
          ],
        },
      },
    ],
  };

  pdfMake.createPdf(documentDefinition).open();
}
