import ButtonComponent from '@/components/common/ButtonComponent'
import { ProgressStepProps } from '@/lib'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'

const ProgressStep = ({
  errors = false,
  removeBtnRow = false,
  scrollable = true,
  activeStep = 0,
  stepCount = 0,
  buttonNextDisabled = false,
  buttonPreviousDisabled = false,
  buttonBottomOffset = 10,
  buttonTopOffset = 12,
  buttonHorizontalOffset = 0,
  ...props
}: ProgressStepProps) => {
  const isPreviousBtnHidden = activeStep === 0

  const onNextStep = () => {
    props.onNext?.()
    if (!errors && props.setActiveStep) {
      props.setActiveStep(activeStep + 1)
    }
  }

  const onPreviousStep = () => {
    props.onPrevious?.()
    if (props.setActiveStep) {
      props.setActiveStep(activeStep - 1)
    }
  }

  const Container = scrollable ? ScrollView : View
  const containerProps = scrollable ? props.scrollViewProps : props.viewProps

  return (
    <View style={styles.container}>
      <Container {...containerProps} style={styles.content}>
        {props.children}
      </Container>

      {!removeBtnRow && (
        <View style={[
          styles.buttonRow,
          {
            marginTop: buttonTopOffset,
            marginBottom: buttonBottomOffset,
            marginHorizontal: buttonHorizontalOffset,
          }
        ]}>
          {!isPreviousBtnHidden && (
            <View style={styles.buttonWrapperLeft}>
              <ButtonComponent
                onPress={onPreviousStep}
                text='back'
                disabled={buttonPreviousDisabled}
              />
            </View>
          )}
          <View style={styles.buttonWrapperRight}>
            {activeStep === stepCount - 1 ? (
              <ButtonComponent
                onPress={props.onSubmit}
                text='completed'
                disabled={buttonNextDisabled}
              />
            ) : (
              <ButtonComponent
                onPress={onNextStep}
                text='next'
                disabled={buttonNextDisabled}
              />
            )}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  buttonWrapperLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonWrapperRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

export default ProgressStep
