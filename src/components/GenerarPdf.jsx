import {Document, Page, Text, StyleSheet, Font, View, Image} from '@react-pdf/renderer';

// \u00e1 = á
// \u00e9 = é
// \u00ed = í
// \u00f3 = ó
// \u00fa = ú
// \u00c1 = Á
// \u00c9 = É
// \u00cd = Í
// \u00d3 = Ó
// \u00da = Ú
// \u00f1 = ñ
// \u00d1 = Ñ

const GenerarPdf = ({receta}) => {
    const convertirFecha = (fechaMilisegundos) => {
        let fechaCompleta = new Date(fechaMilisegundos * 1000);
        let dia = fechaCompleta.getDate();
        let mes = fechaCompleta.getMonth() + 1;
        let anio = fechaCompleta.getFullYear();
        return (dia + "-" + mes + "-" + anio)
    }
    return (
        <Document>
            <Page size="A4" title={"Receta"} style={styles.body}>
                {receta &&
                <>
                    <Text style={styles.header} fixed>
                        ~ {"Prescripci\u00f3n M\u00e9dica Digital con BlockChain"}~
                    </Text>

                    <Text style={styles.subtitle}>
                        {"Datos M\u00e9dico"}
                    </Text>

                    <div style={{flexDirection: 'row'}}>
                        <View style={styles.section}>
                            <Text
                                style={styles.text}>{"Emisi\u00f3n: " + convertirFecha(receta.fecha)}</Text>
                            <Text
                                style={styles.text}>{"Vencimiento: " + convertirFecha(receta.fechaCaducidad)}</Text>
                            <Text
                                style={styles.text}>{"C\u00e9dula Profesional: " + receta.medico.cedulaProfesional}</Text>
                            <Text
                                style={styles.text}>Nombres: {receta.medico.nombres + " " + receta.medico.apellidos}</Text>
                            <Text style={styles.text}>Especialidad: {receta.medico.especialidad}</Text>
                        </View>
                        <View style={styles.section}>

                            {document.getElementById("qr_cuenta") &&
                            <Image src={document.getElementById("qr_cuenta").toDataURL()} style={styles.image}/>}
                        </View>
                    </div>

                    <Text style={styles.subtitle}>
                        {"Datos Paciente"}
                    </Text>
                    <Text style={styles.text}>{"C\u00e9dula: " + receta.paciente.cedula}</Text>
                    <Text
                        style={styles.text}>Nombres: {receta.paciente.nombres + " " + receta.paciente.apellidos}</Text>
                    <Text style={styles.text}>Edad: {receta.paciente.edad}</Text>
                    <Text style={styles.text}>Correo: {receta.paciente.correo}</Text>
                    <Text style={styles.subtitle}>
                        {"Diagn\u00f3stico"}
                    </Text>
                    <Text style={styles.text}>{receta.diagnostico}</Text>
                    <Text style={styles.subtitle}>
                        {"Medicamentos"}
                    </Text>
                    <div style={{flexDirection: 'row'}}>
                        <View style={styles.seccionMedicinas}>
                            <Text style={styles.subtitle}>{"Medicina"}</Text>
                        </View>
                        <View style={styles.seccionMedicinas}>
                            <Text style={styles.subtitle}>{"Indicaci\u00f3n"}</Text>
                        </View>
                    </div>

                    {receta.medicinas.map((x, i) => (
                        <div key={i} style={{flexDirection: 'row'}}>
                            <View style={styles.seccionMedicinas}>
                                <Text style={styles.text}>{x.nombreMedicina}</Text>
                            </View>
                            <View style={styles.seccionMedicinas}>
                                <Text style={styles.text}>{x.indicacion}</Text>
                            </View>
                        </div>
                    ))}
                    <Text style={styles.subtitle}>
                        {"Indicaciones Extras"}
                    </Text>
                    <Text style={styles.text}>{receta.indicacionesExtras}</Text>
                </>
                }
                {/*<Text style={styles.areaFirma}>___________________________</Text>*/}
                {/*<Text style={styles.text} style={{textAlign: "center"}}>Firma</Text>*/}
                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </Page>
        </Document>)
};

const styles = StyleSheet.create({
    body: {
        paddingTop: 5,
        paddingBottom: 45,
        paddingHorizontal: 35,
        fontFamily: 'Roboto'
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        margin: 6,
        textAlign: 'center'
    },
    text: {
        margin: 4,
        fontSize: 10,
        textAlign: 'justify'
    },
    image: {
        width: " 100px",
        height: "100px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    header: {
        fontSize: 12,
        marginBottom: 12,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    }, section: {
        width: "50%",
        margin: 2,
        padding: 6,
        flexGrow: 1
    }, seccionMedicinas: {
        width: "50%",
        margin: 2,
        padding: 6,
        flexGrow: 1,
        border: "1px",
        borderRadius: "5px"
    }, areaFirma: {
        textAlign: "center",
        marginTop: 80
    }
});

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

export default GenerarPdf;