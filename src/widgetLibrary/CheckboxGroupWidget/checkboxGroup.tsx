import { FC, useEffect, useMemo } from "react"
import { CheckboxGroup } from "@illa-design/checkbox"
import { WrappedCheckboxGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedCheckbox: FC<WrappedCheckboxGroupProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    handleUpdateDsl,
    handleOnChange,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      disabled,
      direction,
      colorScheme,
      optionConfigureMode,
      manualOptions,
      mappedOption,
      options: finalOptions,
      setValue: (value: any) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {},
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    displayName,
    finalOptions,
  ])

  return (
    <div css={containerStyle}>
      <CheckboxGroup
        value={value}
        disabled={disabled}
        options={finalOptions}
        direction={direction}
        colorScheme={colorScheme}
        onChange={(value) => {
          handleOnChange?.({ value })
          handleUpdateDsl({ value })
        }}
      />
    </div>
  )
}

WrappedCheckbox.displayName = "RadioGroupWidget"

export const CheckboxWidget = WrappedCheckbox
