// Formulario de contacto (demo): valida, simula el envío y muestra el resultado.
// No envía datos reales.
import { useState, type FormEvent } from "react";
import Field from "../ui/Field";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import styles from "./ContactForm.module.css";

type Estado = "inicial" | "enviando" | "enviado" | "error";
type Errores = Partial<Record<"nombre" | "telefono", string>>;

const INTERESES = ["Tractores", "Cosechadoras", "Usados", "Precisión y drones", "Servicio técnico", "Repuestos"];

function validar(datos: FormData): Errores {
  const errores: Errores = {};
  const nombre = String(datos.get("nombre") ?? "").trim();
  const telefono = String(datos.get("telefono") ?? "").replace(/\D/g, "");
  if (nombre.length < 2) errores.nombre = "Contanos tu nombre";
  if (telefono.length < 10) errores.telefono = "Ingresá un teléfono válido con código de área";
  return errores;
}

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [errores, setErrores] = useState<Errores>({});

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault(); // evitamos que el navegador recargue la página
    const nuevosErrores = validar(new FormData(evento.currentTarget));
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setEstado("error");
      return;
    }

    // Simulamos el envío: en un sitio real, acá iría la llamada al servidor
    setEstado("enviando");
    setTimeout(() => setEstado("enviado"), 1200);
  }

  if (estado === "enviado") {
    return (
      <div className={styles.form}>
        <Alert tone="success" title="¡Consulta enviada!">
          Un asesor te va a contactar a la brevedad. (Demo: no se enviaron datos reales).
        </Alert>
        <Button variant="link" onClick={() => setEstado("inicial")}>Enviar otra consulta</Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={enviar} noValidate>
      <h3 className={styles.title}>Dejanos tus datos</h3>

      {estado === "error" && (
        <Alert tone="error" title="No pudimos enviar tu consulta">
          Revisá los datos marcados o escribinos por WhatsApp.
        </Alert>
      )}

      <div className={styles.row}>
        <Field label="Nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" error={errores.nombre} />
        <Field label="Teléfono" name="telefono" placeholder="Código de área y número" inputMode="tel" autoComplete="tel" error={errores.telefono} />
      </div>
      <Field as="select" label="Me interesa" name="interes" options={INTERESES} />
      <Field as="textarea" label="Mensaje" name="mensaje" placeholder="Contanos qué estás buscando" />

      <Button type="submit" variant="secondary" fullWidth disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar consulta (demo)"}
      </Button>
    </form>
  );
}