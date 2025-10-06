import { useAppTheme } from '@/contexts/ThemeProvider'
import { FONT_FAMILIES } from '@/lib'
import type { ProgressStepsProps, ProgressStepsState } from '@/lib/types'
import { Children, cloneElement, useEffect, useState } from 'react'
import { View } from 'react-native'
import StepIcon from './StepIcon'

const ProgressSteps = ({
  children,
  isComplete = false,
  activeStep: initialActiveStep = 0,
  ...props
}: ProgressStepsProps) => {
  const { colors } = useAppTheme()
  const [stepCount, setStepCount] = useState<ProgressStepsState['stepCount']>(0)
  const [activeStep, setActiveStep] = useState<ProgressStepsState['activeStep']>(initialActiveStep)

  useEffect(() => {
    setStepCount(Children.count(children))
  }, [children])

  useEffect(() => {
    setActiveStep(initialActiveStep)
  }, [initialActiveStep])

  const handleSetActiveStep = (step: number) => {
    const boundedStep = Math.min(Math.max(step, 0), stepCount - 1)
    setActiveStep(boundedStep)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {Array.from({ length: stepCount }, (_, index) => (
          <View key={index} style={{ flex: 1 }}>
            <StepIcon
              {...props}
              stepNum={index + 1}
              label={children[index].props.label}
              isFirstStep={index === 0}
              isLastStep={index === stepCount - 1}
              isCompletedStep={isComplete || index < activeStep}
              isActiveStep={!isComplete && index === activeStep}
              activeStepIconBorderColor={colors.primary}
              completedStepIconColor={colors.primary}
              activeLabelColor={colors.primary}
              completedProgressBarColor={colors.primary}
              activeStepNumColor={colors.primary}
              disabledStepIconColor={colors.surface}
              labelColor={colors.surfaceDisabled}
              labelFontFamily={FONT_FAMILIES.SEMIBOLD}
              disabledStepNumColor={colors.surfaceDisabled}
              completedLabelColor={colors.primary}
            />
          </View>
        ))}
      </View>
      {cloneElement(children[activeStep], {
        setActiveStep: handleSetActiveStep,
        activeStep,
        stepCount,
      })}
    </View>
  )
}

export default ProgressSteps
