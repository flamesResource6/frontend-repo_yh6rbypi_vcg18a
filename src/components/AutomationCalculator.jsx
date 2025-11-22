import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';

export default function AutomationCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(300);
  const [avgHourlyCost, setAvgHourlyCost] = useState(25);
  const [automationPct, setAutomationPct] = useState(50);
  const [errorCostPerWeek, setErrorCostPerWeek] = useState(500);
  const [automationErrorReduction, setAutomationErrorReduction] = useState(70);

  const compute = useMemo(() => () => {
    const hoursAutomated = (hoursPerWeek * automationPct) / 100;
    const weeklyLaborSavings = hoursAutomated * avgHourlyCost;

    const weeklyErrorSavings = (errorCostPerWeek * automationErrorReduction) / 100;

    const monthlySavings = (weeklyLaborSavings + weeklyErrorSavings) * 4.33;
    const annualSavings = monthlySavings * 12;

    const platformCost = 4000; // monthly platform + orchestration
    const roiPct = Math.min(100, Math.max(0, (monthlySavings / platformCost) * 100));
    const paybackMonths = platformCost > 0 ? Math.max(0.5, platformCost / monthlySavings) : 0;

    const headline = `Automate ~${Math.round(hoursAutomated)} hrs/week and cut rework/errors`;

    return { savingsPct: roiPct, annualSavings, paybackMonths, headline };
  }, [hoursPerWeek, avgHourlyCost, automationPct, errorCostPerWeek, automationErrorReduction]);

  const inputs = [
    { key: 'hoursPerWeek', label: 'Team hours spent on process/week', defaultValue: hoursPerWeek, onChange: setHoursPerWeek, step: 10, min: 0 },
    { key: 'avgHourlyCost', label: 'Average hourly cost ($)', defaultValue: avgHourlyCost, onChange: setAvgHourlyCost, step: 1, min: 0 },
    { key: 'automationPct', label: 'Automation coverage (%)', defaultValue: automationPct, onChange: setAutomationPct, step: 5, min: 0 },
    { key: 'errorCostPerWeek', label: 'Current weekly error/rework cost ($)', defaultValue: errorCostPerWeek, onChange: setErrorCostPerWeek, step: 50, min: 0 },
    { key: 'automationErrorReduction', label: 'Error reduction with automation (%)', defaultValue: automationErrorReduction, onChange: setAutomationErrorReduction, step: 5, min: 0 },
  ];

  return (
    <CalculatorCard
      title="Automation ROI"
      description="Estimate labor savings and error reduction from automating repetitive workflows."
      inputs={inputs}
      compute={compute}
    />
  );
}
