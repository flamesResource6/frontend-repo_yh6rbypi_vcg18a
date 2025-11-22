import { useState, useMemo } from 'react';
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

    const annualSavings = (additionalRevenue + costSavings) * 12;

    const investCost = 5000; // rough platform + integration per month
    const savingsPct = Math.min(100, Math.max(0, ((additionalRevenue + costSavings) / investCost) * 100));
    const paybackMonths = investCost > 0 ? Math.max(0.5, investCost / (additionalRevenue + costSavings)) : 0;

    const headline = `Recover ~${Math.round(recoveredCalls)} missed calls/month and save on handling costs`;

    return { savingsPct, annualSavings, paybackMonths, headline };
  }, [callsPerMonth, missedPct, avgCostPerCall, conversionRate, avgOrderValue, automationCoverage]);

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
    />
  );
}
