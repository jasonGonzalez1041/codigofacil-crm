import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CodigoFacil CRM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de gestión para CodigoFacil.com - Desarrollo Web Profesional
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900">CRM</h3>
            <p className="text-gray-600">Gestión de clientes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-gray-900">Pipeline</h3>
            <p className="text-gray-600">Control de ventas</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-2xl font-bold text-gray-900">Analytics</h3>
            <p className="text-gray-600">Métricas en tiempo real</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Acceder al Dashboard
          </Link>
          <a
            href="https://codigofacil.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Visitar CodigoFacil.com
          </a>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500">
          <p>© 2025 CodigoFacil.com - Desarrollo Web en Costa Rica</p>
          <p className="mt-2">📱 +506 8646-2423 | 📧 info@codigofacil.com</p>
        </div>
      </div>
    </div>
  );
}
