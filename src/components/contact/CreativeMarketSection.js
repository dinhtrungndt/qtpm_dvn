export default function CreativeMarketSection() {
  return (
    <div className="mt-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bắt đầu Kiếm tiền với DVN Technology
          </h2>
          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            Bán thiết kế của bạn và tiếp cận hàng triệu người mua hoặc quảng bá các nghệ sĩ khác trên DVN Technology để kiếm tiền!
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+84399690987" className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
              Liên hệ ngay
            </a>
            <button className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
              Trở thành đối tác
            </button>
          </div>

          {/* Decorative Line */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <svg className="w-full h-2" viewBox="0 0 300 20" fill="none">
              <path d="M2 10 Q 50 2, 100 10 T 200 10 T 298 10" stroke="#0D9488" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-orange-200 to-purple-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
