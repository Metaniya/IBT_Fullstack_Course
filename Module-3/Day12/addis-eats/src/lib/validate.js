const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export function validate(form) {
    const errors = {};

    if (!form.name.trim()) {
        errors.name = "We need a name for the delivery";
    }

    const phone = form.phone.replace(/\s+/g, "");
    if (!TELEBIRR.test(phone)) {
        errors.phone = "Use 09... or +2519... (TeleBirr number)";
    }

    return errors;
}