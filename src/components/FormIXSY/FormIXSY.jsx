import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Aquí puedes integrar con tu servicio de email preferido
      // Por ejemplo: EmailJS, Netlify Forms, o tu propio endpoint
      
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Datos del formulario:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20">
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contáctanos
          </h2>
        </div>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 "></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-black/60 backdrop-blur-md rounded-lg p-8 space-y-6"
            >
              {/* Fila superior - Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <input
                  type="tel"
                  name="company"
                  placeholder="Organización/empresa"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200"
                />
              </div>

              {/* Mensaje */}
              <div>
                <textarea
                  name="mensaje"
                  placeholder="Mensaje"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200 resize-vertical"
                />
              </div>

              {/* Botón de envío */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
                </button>
              </div>

              {/* Mensajes de estado */}
              {submitStatus === 'success' && (
                <div className="text-center text-teal-400 font-medium">
                  ¡Mensaje enviado correctamente! Te contactaremos pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-center text-red-400 font-medium">
                  Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                </div>
              )}

              {/* Texto de protección */}
              <div className="text-center text-sm text-gray-400">
                Este sitio está protegido por reCAPTCHA y se aplican las{' '}
                <a href="https://policies.google.com/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Políticas de privacidad
                </a>{' '}
                y los{' '}
                <a href="https://policies.google.com/terms" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Términos de servicio de Google
                </a>.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;