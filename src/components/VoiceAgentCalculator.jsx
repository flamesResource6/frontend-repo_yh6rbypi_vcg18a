import { useState, useMemo, useCallback } from 'react';
import CalculatorCard from './CalculatorCard';

export default function VoiceAgentCalculator() {
  const [callsPerMonth, setCallsPerMonth] = useState(5000);
  const [missedPct, setMissedPct] = useState(15);
  const [avgCostPerCall, setAvgCostPerCall] = useState(3.5);
  const [conversionRate, setConversionRate] = useState(10);
  const [avgOrderValue, setAvgOrderValue] = useState(80);
  const [automationCoverage, setAutomationCoverage] = useState(60);

  const compute = useMemo(() => () => {
    const missedCalls = (callsPerMonth * missedPct) / 100;
    const recoveredCalls = missedCalls * (automationCoverage / 100);

    const additionalRevenue = recoveredCalls * (conversionRate / 100) * avgOrderValue;

    const currentCallCost = callsPerMonth * avgCostPerCall;
    const aiCost = (callsPerMonth * automationCoverage/100) * (avgCostPerCall * 0.3);
    const costSavings = Math.max(0, currentCallCost - aiCost);

    const monthlyBenefit = additionalRevenue + costSavings;
    const annualSavings = monthlyBenefit * 12;

    const investCost = 5000; // per month
    const savingsPct = Math.min(100, Math.max(0, (monthlyBenefit / investCost) * 100));
    const paybackMonths = investCost > 0 && monthlyBenefit > 0 ? Math.max(0.5, investCost / monthlyBenefit) : Infinity;

    const headline = `Recover ~${Math.round(recoveredCalls)} missed calls/month and save on handling costs`;

    return { savingsPct, annualSavings, paybackMonths, headline, context: {
      callsPerMonth, missedPct, avgCostPerCall, conversionRate, avgOrderValue, automationCoverage,
      missedCalls, recoveredCalls, additionalRevenue, costSavings, monthlyBenefit, investCost
    }};
  }, [callsPerMonth, missedPct, avgCostPerCall, conversionRate, avgOrderValue, automationCoverage]);

  const handleExport = useCallback(() => {
    const result = compute();
    const rows = [
      ['Metric', 'Value'],
      ['Inbound calls per month', callsPerMonth],
      ['Missed calls (%)', missedPct + '%'],
      ['Average handling cost per call ($)', avgCostPerCall],
      ['Conversion rate (%)', conversionRate + '%'],
      ['Average order value ($)', avgOrderValue],
      ['Automation coverage (%)', automationCoverage + '%'],
      ['Missed calls (calc)', Math.round(result.context.missedCalls)],
      ['Recovered calls (calc)', Math.round(result.context.recoveredCalls)],
      ['Additional revenue (monthly)', result.context.additionalRevenue.toFixed(2)],
      ['Cost savings (monthly)', result.context.costSavings.toFixed(2)],
      ['Monthly benefit', result.context.monthlyBenefit.toFixed(2)],
      ['Platform cost (monthly)', result.context.investCost],
      ['ROI (%)', Math.round(result.savingsPct) + '%'],
      ['Annual savings', result.annualSavings.toFixed(2)],
      ['Payback (months)', Number.isFinite(result.paybackMonths) ? result.paybackMonths.toFixed(2) : 'N/A'],
    ];

    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voice-agent-roi.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [compute, callsPerMonth, missedPct, avgCostPerCall, conversionRate, avgOrderValue, automationCoverage]);

  const inputs = [
    { key: 'callsPerMonth', label: 'Inbound calls per month', defaultValue: callsPerMonth, onChange: setCallsPerMonth, step: 100, min: 0 },
    { key: 'missedPct', label: 'Missed calls (%)', defaultValue: missedPct, onChange: setMissedPct, step: 1, min: 0 },
    { key: 'avgCostPerCall', label: 'Average handling cost per call ($)', defaultValue: avgCostPerCall, onChange: setAvgCostPerCall, step: 0.5, min: 0 },
    { key: 'conversionRate', label: 'Conversion rate (%)', defaultValue: conversionRate, onChange: setConversionRate, step: 1, min: 0 },
    { key: 'avgOrderValue', label: 'Average order value ($)', defaultValue: avgOrderValue, onChange: setAvgOrderValue, step: 5, min: 0 },
    { key: 'automationCoverage', label: 'Automation coverage (%)', defaultValue: automationCoverage, onChange: setAutomationCoverage, step: 5, min: 0 },
  ];

  return (
    <CalculatorCard
      title="AI Voice Agent ROI"
      description="Estimate revenue recovered from missed calls and savings from automated call handling."
      inputs={inputs}
      compute={compute}
      theme="light"
      onExport={handleExport}
    />
  );
}
