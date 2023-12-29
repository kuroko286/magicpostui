import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import TruckIcon from "@heroicons/react/24/solid/TruckIcon";
import CliboardDocumentListIcon from "@heroicons/react/24/solid/ClipboardDocumentListIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Tổng quan",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Văn phòng",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Thêm văn phòng",
        path: "/offices/add_office",
      },
      {
        title: "Tất cả văn phòng",
        path: "/offices/all_offices",
      },
    ],
    allowedRoles: ["ADMIN"],
  },

  {
    title: "Nhân viên",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Thêm nhân viên",
        path: "/staffs/add_staff",
      },
      {
        title: "Tất cả nhân viên",
        path: "/staffs/all_staffs",
      },
    ],
    allowedRoles: ["TRANSACTION_POINT_MANAGER", "GATHERING_POINT_MANAGER"],
  },

  {
    title: "Đơn hàng",
    icon: (
      <SvgIcon fontSize="small">
        <CliboardDocumentListIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tạo đơn hàng",
        path: "/orders/create_order",
        allowedRoles: ["TRANSACTION_POINT_STAFF"],
      },
      {
        title: "Giao đơn hàng",
        path: "/orders/shipping_order",
        allowedRoles: ["TRANSACTION_POINT_STAFF"],
      },
      {
        title: "Xác nhận đơn hàng",
        path: "/orders/confirm_order",
        allowedRoles: ["TRANSACTION_POINT_STAFF"],
      },
      {
        title: "Tra cứu đơn hàng",
        path: "/orders/search_order",
      },
      {
        title: "Tất cả đơn hàng",
        path: "/orders/all_orders",
      },
    ],
  },
  {
    title: "Vận chuyển",
    icon: (
      <SvgIcon fontSize="small">
        <TruckIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tạo vận chuyển",
        path: "/transfers/create_transfer",
        allowedRoles: ["TRANSACTION_POINT_STAFF", "GATHERING_POINT_STAFF"],
      },
      {
        title: "Xác nhận vận chuyển",
        path: "/transfers/confirm_transfer",
        allowedRoles: ["TRANSACTION_POINT_STAFF", "GATHERING_POINT_STAFF"],
      },
      {
        title: "Tất cả vận chuyển",
        path: "/transfers/all_transfers",
      },
    ],
  },
  {
    title: "Tài khoản",
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Hồ sơ người dùng",
        path: "/account",
      },
      {
        title: "Cài đặt",
        path: "/settings",
      },
    ],
  },
];
