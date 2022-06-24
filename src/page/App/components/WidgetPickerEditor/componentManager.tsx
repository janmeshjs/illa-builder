import { componentPanelCss } from "./style"
import { TabPane, Tabs } from "@illa-design/tabs"
import { ComponentPanel } from "./components/ComponentPanel"
import { ConfigPanel } from "./components/ConfigPanel"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getIsSelectedComponent } from "@/redux/config/configSelector"

function ComponentsManager() {
  const { t } = useTranslation()

  const [activeKey, setActiveKey] = useState("Insert")

  const isSelectedComponent = useSelector(getIsSelectedComponent)

  useEffect(() => {
    if (isSelectedComponent) {
      setActiveKey("Inspect")
    } else {
      setActiveKey("Insert")
    }
  }, [isSelectedComponent])

  return (
    <div css={componentPanelCss}>
      <Tabs
        variant="text"
        activeKey={activeKey}
        colorScheme="grayBlue"
        onChange={(key) => {
          setActiveKey(key)
        }}
      >
        <TabPane title={t("editor.inspect.tab_title")} key="Inspect">
          <ConfigPanel />
        </TabPane>
        <TabPane title={t("editor.widget_picker.tab_title")} key="Insert">
          <ComponentPanel />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ComponentsManager
