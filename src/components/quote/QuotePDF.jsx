import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const formatCurrency = (val) => val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', color: '#1a1a1a' },
  header: { marginBottom: 30, borderBottom: '2 solid #324234', paddingBottom: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#324234' },
  subtitle: { fontSize: 10, color: '#666', marginTop: 4 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, backgroundColor: '#324234', color: '#fff', padding: '6 8', textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: '6 8', borderBottom: '1 solid #e5e5e5', fontSize: 10 },
  rowHighlight: { flexDirection: 'row', justifyContent: 'space-between', padding: '6 8', borderBottom: '1 solid #e5e5e5', fontSize: 10, backgroundColor: '#fafafa' },
  label: { color: '#444' },
  value: { fontWeight: 'bold', textAlign: 'right' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, padding: '12 8', backgroundColor: '#f0f3f0', borderTop: '2 solid #324234', borderBottom: '2 solid #324234', fontSize: 13, fontWeight: 'bold', color: '#324234' },
  disclaimer: { marginTop: 40, fontSize: 9, color: '#888', fontStyle: 'italic', textAlign: 'center' }
});

const QuotePDF = ({ quoteData, contactEmail }) => {
  const { inputs, calculation, lead } = quoteData;
  const { species, grade, dimensions, quantity, volumeM3, isS4S, isKD, region } = inputs;
  const { baseTimberCostMYR, s4sCostMYR, kdCostMYR, singleContainerFreightMYR, recommendedContainers, totalCostMYR, totalCostUSD } = calculation;

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
          <View style={styles.rowHighlight}><Text style={styles.label}>Grade</Text><Text style={styles.value}>{grade}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Dimensions</Text><Text style={styles.value}>{dimensions}</Text></View>
          <View style={styles.rowHighlight}><Text style={styles.label}>Quantity</Text><Text style={styles.value}>{Number(quantity).toLocaleString('en-US')} pieces</Text></View>
          <View style={styles.row}><Text style={styles.label}>Total Volume (m³)</Text><Text style={styles.value}>{volumeM3.toFixed(3)}</Text></View>
          <View style={styles.rowHighlight}><Text style={styles.label}>Processing</Text><Text style={styles.value}>{isS4S ? 'S4S' : 'Rough Sawn'} {isKD ? '+ Kiln Dried' : ''}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Destination Region</Text><Text style={styles.value}>{region.region}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Costs Breakdown</Text>
          <View style={styles.row}><Text style={styles.label}>Base Timber ({species.species})</Text><Text style={styles.value}>RM {formatCurrency(baseTimberCostMYR)}</Text></View>
          {isS4S && <View style={styles.rowHighlight}><Text style={styles.label}>Processing (S4S)</Text><Text style={styles.value}>+ RM {formatCurrency(s4sCostMYR)}</Text></View>}
          {isKD && <View style={isS4S ? styles.row : styles.rowHighlight}><Text style={styles.label}>Processing (Kiln Dried)</Text><Text style={styles.value}>+ RM {formatCurrency(kdCostMYR)}</Text></View>}
          <View style={(!isS4S && !isKD) || (isS4S && isKD) ? styles.rowHighlight : styles.row}><Text style={styles.label}>Freight ({region.region} — 1 x 40ft container)</Text><Text style={styles.value}>RM {formatCurrency(singleContainerFreightMYR)}</Text></View>
          
          {recommendedContainers > 1 && (
             <View style={styles.row}><Text style={styles.label}>Recommended containers for this volume</Text><Text style={styles.value}>{recommendedContainers} containers</Text></View>
          )}
          
          <View style={styles.totalRow}>
            <Text>Total Indicative Value (1 container)</Text>
            <Text>RM {formatCurrency(totalCostMYR)} / ${formatCurrency(totalCostUSD)} USD</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          * This is not a final quotation; it is an indicative price only. For a full, detailed quotation, please get in touch at {contactEmail}.
        </Text>
      </Page>
    </Document>
  );
};

export default QuotePDF;
