// Demo de estados para /sistema. No se usa en el sitio.
import Alert from "../ui/Alert";
import Skeleton from "../ui/Skeleton";
import StateMessage from "../ui/StateMessage";
import Button from "../ui/Button";

export default function DemoEstados() {
  return (
    <div style={{ display: "grid", gap: "var(--space-8)" }}>
      <div style={{ display: "grid", gap: "var(--space-3)", maxWidth: 420 }}>
        <Alert tone="success" title="¡Consulta enviada!">Un asesor te va a contactar a la brevedad.</Alert>
        <Alert tone="error" title="No pudimos enviar tu consulta">Revisá los datos marcados o escribinos por WhatsApp.</Alert>
        <Alert tone="info" title="Datos de demostración">Este formulario no envía consultas reales.</Alert>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)", maxWidth: 282 }}>
        <Skeleton shape="block" height={212} />
        <Skeleton width="40%" height={10} />
        <Skeleton width="70%" height={20} />
        <Skeleton width="50%" />
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Skeleton shape="block" height={40} />
          <Skeleton shape="block" height={40} />
        </div>
      </div>

      <StateMessage
        type="empty"
        title="No encontramos resultados"
        message="Probá con otros filtros o consultanos: te ayudamos a encontrar el equipo para tu campo."
      >
        <Button variant="secondary">Limpiar filtros</Button>
        <Button icon="chat">Consultar por WhatsApp</Button>
      </StateMessage>

      <StateMessage
        type="error"
        title="No pudimos cargar los equipos"
        message="Puede ser un problema de conexión. Revisá tu señal e intentá de nuevo."
      >
        <Button icon="recargar">Reintentar</Button>
        <Button variant="link" icon="chat">Consultar por WhatsApp</Button>
      </StateMessage>
    </div>
  );
}