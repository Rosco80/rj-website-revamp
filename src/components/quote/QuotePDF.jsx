import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', color: '#1a1a1a' },
  header: { marginBottom: 30, borderBottom: '1 solid #e5e5e5', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 10, color: '#666', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, backgroundColor: '#f5f5f5', padding: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, fontSize: 10 },
  label: { color: '#666' },
  value: { fontWeight: 'bold' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1 solid #e5e5e5', fontSize: 14, fontWeight: 'bold' },
  disclaimer: { marginTop: 40, fontSize: 9, color: '#888', fontStyle: 'italic', textAlign: 'center' }
});

const QuotePDF = ({ quoteData, contactEmail }) => {
  const { inputs, calculation, lead } = quoteData;
  const { species, grade, dimensions, quantity, volumeM3, isS4S, isKD, region } = inputs;
  const { timberCostMYR, kdCostMYR, totalFreightMYR, numContainers, totalCostMYR, totalCostUSD } = calculation;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>R&J Wood Trading</Text>
          <Text style={styles.subtitle}>Prepared for: {lead.name} ({lead.company})</Text>
          <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Requirements</Text>
          <View style={styles.row}><Text style={styles.label}>Species</Text><Text style={styles.value}>{species.species}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Grade</Text><Text style={styles.value}>{grade}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Dimensions</Text><Text style={styles.value}>{dimensions}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Quantity</Text><Text style={styles.value}>{quantity} pieces</Text></View>
          <View style={styles.row}><Text style={styles.label}>Total Volume (m³)</Text><Text style={styles.value}>{volumeM3.toFixed(3)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Processing</Text><Text style={styles.value}>{isS4S ? 'S4S' : 'Rough Sawn'} {isKD ? '+ Kiln Dried' : ''}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Destination Region</Text><Text style={styles.value}>{region.region}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Costs Breakdown</Text>
          <View style={styles.row}><Text style={styles.label}>Base Timber (incl. S4S if applicable)</Text><Text style={styles.value}>RM {timberCostMYR.toFixed(2)}</Text></View>
          {isKD && <View style={styles.row}><Text style={styles.label}>Kiln Drying</Text><Text style={styles.value}>RM {kdCostMYR.toFixed(2)}</Text></View>}
          <View style={styles.row}><Text style={styles.label}>Freight ({numContainers} x 40ft container)</Text><Text style={styles.value}>RM {totalFreightMYR.toFixed(2)}</Text></View>
          
          <View style={styles.totalRow}>
            <Text>Total Indicative Value</Text>
            <Text>RM {totalCostMYR.toFixed(2)} / ${totalCostUSD.toFixed(2)} USD</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          * This is not the final quotation. This is just an indicative price for a full detail quotation. Please get in touch at {contactEmail}
        </Text>
      </Page>
    </Document>
  );
};

export default QuotePDF;
