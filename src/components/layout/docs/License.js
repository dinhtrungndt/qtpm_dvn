import { Building2, Check, Facebook, FileCheck, Linkedin, Rocket, Target, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const About_DVN = () => {
  const techStack = [
    {
      icon: <Check className="w-6 h-6" />,
      title: ".NET & C# Development",
      description: "Xây dựng hệ thống doanh nghiệp, web app và API mạnh mẽ, ổn định với nền tảng .NET và ngôn ngữ C#.",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "SQL Server & Data Solutions",
      description: "Tối ưu hóa cơ sở dữ liệu và truy vấn hiệu năng cao với Microsoft SQL Server.",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Python Automation & AI Integration",
      description: "Tích hợp các mô hình AI/ML, tự động hóa quy trình với Python và các thư viện hiện đại.",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "ReactJS & Modern Frontend",
      description: "Xây dựng giao diện người dùng hiện đại, mượt mà với ReactJS và JavaScript.",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "TailwindCSS & UI Excellence",
      description: "Thiết kế giao diện tinh gọn, tối ưu trải nghiệm người dùng với TailwindCSS.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Giới thiệu DVN Technology</h1>
          <div className="flex items-center gap-2 text-xs">
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Giới thiệu</span>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <FileCheck className="w-10 h-10 text-emerald-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">DVN Technology - Innovating the Future</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                <span className="font-semibold text-emerald-600">Công ty TNHH Kỹ Thuật Công Nghệ DVN (DVN Technology)</span> được thành lập năm <strong>2025</strong>,
                với sứ mệnh trở thành đơn vị tiên phong trong lĩnh vực <strong>phát triển phần mềm quản lý thông minh và chuyển đổi số doanh nghiệp</strong>.
                Chúng tôi cung cấp các giải pháp như phần mềm <strong>quản lý tài sản, quản lý hàng chờ và gọi số bệnh viện</strong>,
                hỗ trợ <strong>kiểm kê thông minh bằng QR Code</strong>, <strong>tự động hóa xếp hàng</strong> và <strong>quản lý dữ liệu tập trung</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Công nghệ chủ đạo tại DVN Technology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 hover:border-emerald-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision - Mission - Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <Target className="w-10 h-10 mx-auto text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tầm nhìn</h3>
            <p className="text-gray-600">
              Trở thành công ty dẫn đầu trong lĩnh vực phần mềm quản lý thông minh, tiên phong trong chuyển đổi số,
              mang lại giá trị bền vững và hiệu quả vận hành cho mọi tổ chức.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <Rocket className="w-10 h-10 mx-auto text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sứ mệnh</h3>
            <p className="text-gray-600">
              Cung cấp giải pháp phần mềm sáng tạo, tối ưu hóa quy trình và nâng cao trải nghiệm người dùng,
              góp phần thúc đẩy phát triển bền vững cho cộng đồng và doanh nghiệp.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <Building2 className="w-10 h-10 mx-auto text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Giá trị cốt lõi</h3>
            <p className="text-gray-600">
              Đổi mới sáng tạo – Uy tín – Hợp tác – Hiệu quả.
              DVN Technology cam kết mang đến giải pháp công nghệ chất lượng cao và bền vững.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Số hóa thông minh – Tối ưu hiệu quả – Hướng tới tương lai</h3>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            DVN Technology không chỉ tạo ra phần mềm – chúng tôi tạo ra giá trị.
            Với công nghệ hiện đại và đội ngũ chuyên nghiệp, chúng tôi đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h3>
          <p className="text-gray-700"><strong>DVN TECHNOLOGY ENGINEERING COMPANY LIMITED</strong></p>
          <p className="text-gray-600">📍 26/37/5 Đường B3, Phường Tây Thạnh, TP. Hồ Chí Minh</p>
          <p className="text-gray-600">📞 Hotline: 0399.690.987</p>
          <p className="text-gray-600">📧 Email: congnghedvn@gmail.com</p>
          <p className="text-gray-500 text-sm">© 2025 DVN Technology. All rights reserved.</p>

          <div className="flex justify-center gap-6 mt-4">
            <Link to="/facebook" className="text-emerald-600 hover:text-emerald-700 transition"><Facebook size={24} /></Link>
            <Link to="/linkedin" className="text-emerald-600 hover:text-emerald-700 transition"><Linkedin size={24} /></Link>
            <Link to="/youtube" className="text-emerald-600 hover:text-emerald-700 transition"><Youtube size={24} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_DVN;
