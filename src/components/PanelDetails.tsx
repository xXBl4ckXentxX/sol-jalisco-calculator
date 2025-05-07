
import { PanelSolar } from "@/data/municipios";
import { Card, CardContent } from "@/components/ui/card";

interface PanelDetailsProps {
  panel: PanelSolar;
}

const PanelDetails = ({ panel }: PanelDetailsProps) => {
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-2">Especificaciones del panel seleccionado</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Modelo</p>
            <p className="font-medium">{panel.nombre}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Potencia</p>
            <p className="font-medium">{panel.potencia} W</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Área</p>
            <p className="font-medium">{panel.area} m²</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Eficiencia</p>
            <p className="font-medium">{panel.eficiencia}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Precio unitario</p>
            <p className="font-medium">
              {new Intl.NumberFormat('es-MX', { 
                style: 'currency', 
                currency: 'MXN' 
              }).format(panel.costoPorPanel)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Garantía</p>
            <p className="font-medium">{panel.garantia} años</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanelDetails;
