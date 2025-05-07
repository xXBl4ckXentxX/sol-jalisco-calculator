
import { Card, CardContent } from "./ui/card";

const Benefits = () => {
  const benefits = [
    {
      title: "Ahorra en tu factura",
      description: "Reduce tu factura de electricidad hasta un 90% con tu sistema solar.",
      icon: "💰"
    },
    {
      title: "Energía limpia",
      description: "Contribuye al medio ambiente utilizando energía renovable.",
      icon: "🌿"
    },
    {
      title: "Mayor valor de propiedad",
      description: "Los sistemas solares aumentan el valor de tu hogar.",
      icon: "🏠"
    }
  ];

  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Beneficios de la energía solar
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
