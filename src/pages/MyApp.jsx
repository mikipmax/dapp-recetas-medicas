import React, {useRef, useState} from 'react';
import {PDFViewer, Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }

});

// Create Document Component
const MyDocument = ({data})=>(

    // (<>
    //     <div className="modal fade" id="exampleModal" tabIndex="-1"
    //          aria-labelledby="exampleModalLabel" aria-hidden="true">
    //         <div className="modal-dialog modal-xl">
    //             <div className="modal-content">
    //                 <div className="modal-body">
    //                     <PDFViewer >
    <Document>
        <Page size="A4" title={"Receta"} style={styles.page}>
            <View style={styles.section}>
                <Text>{data}</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
    //                     </PDFViewer>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </>);
)

export default MyDocument;