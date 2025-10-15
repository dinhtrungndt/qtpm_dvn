import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';

export const statsDataV1 = [
  {
    id: 1,
    number: '2,847',
    label: 'Tổng Doanh Thu',
    subtitle: '+12.5% so với tháng trước',
    icon: DollarSign,
    bgColor: 'from-blue-500 to-blue-600',
    trend: '+12.5%'
  },
  {
    id: 2,
    number: '1,234',
    label: 'Người Dùng Hoạt Động',
    subtitle: '+8.2% so với tuần trước',
    icon: Users,
    bgColor: 'from-emerald-500 to-emerald-600',
    trend: '+8.2%'
  },
  {
    id: 3,
    number: '567',
    label: 'Đơn Hàng Mới',
    subtitle: '+23.1% so với hôm qua',
    icon: ShoppingBag,
    bgColor: 'from-amber-500 to-amber-600',
    trend: '+23.1%'
  },
  {
    id: 4,
    number: '89.2%',
    label: 'Tỷ Lệ Chuyển Đổi',
    subtitle: '+5.4% cải thiện',
    icon: TrendingUp,
    bgColor: 'from-rose-500 to-rose-600',
    trend: '+5.4%'
  }
];
