/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import {
  VerticalIcons
} from '../../types/vertical-icons'
import * as packageJson from '../../../../../package.json'
import Home from './components/Home'
import Icon from './components/Icon'
import { resolveClassesReducer } from './reducers/verticalIconsPanelReducers'
import './remix-ui-vertical-icons.css'
import Settings from './components/Settings'
import OtherIcons from './components/OtherIcon'
export interface RemixUiVerticalIconsProps {
  verticalIconsPlugin: VerticalIcons
}

export const profile = {
  name: 'menuicons',
  displayName: 'Vertical Icons',
  description: '',
  version: packageJson.version,
  methods: ['select']
}

function ShowChevron () {
  return (
    <span className="remixui_icon-chevron"></span>
  )
}

export function RemixUiVerticalIcons({
  verticalIconsPlugin
}: RemixUiVerticalIconsProps) {
  const [classes, dispatchResolveClasses] = useReducer(
    resolveClassesReducer,
    ''
  )
  const scrollableRef = useRef(null)
  const iconPanelRef = useRef(null)

  function onThemeChanged (themeType: any) {
    const invert = themeType === 'dark' ? 1 : 0
    const active = iconPanelRef.current.querySelector('.active')
    if (active) {
      const image = iconPanelRef.current.querySelector('.remixui_image')
      image.style.setProperty('filter', `invert(${invert})`)
    }
  }

  async function itemContextAction (e: any, name: string, documentation: string) {
    verticalIconsPlugin.appManager.deactivatePlugin(name)
    if (e.target.parentElement.classList.contains('active')) {
      verticalIconsPlugin.select('filePanel')
    }
    verticalIconsPlugin.renderComponent()
  }

  useEffect(() => {
    console.log('panel ref ', iconPanelRef.current)
  }, [])

  useEffect(() => {
    const themeModule = verticalIconsPlugin.registry.get('themeModule').api
    themeModule.events.on('themeChanged', (theme) => {
      onThemeChanged(theme.quality)
    })
  }, [])

  return (
    <div id="iconsP" className="h-100">
      <div className="remixui_icons" ref={iconPanelRef}>
        <div>
        <Home verticalIconPlugin={verticalIconsPlugin} />
        </div>
        <div
          id="remixuiScrollable"
          className="remixui_scrollable-container remixui_scrollbar remixui_hide-scroll"
          ref={scrollableRef}
        >
          {verticalIconsPlugin.targetProfileForChange &&
          Object.keys(verticalIconsPlugin.targetProfileForChange).length
            ? Object.keys(verticalIconsPlugin.targetProfileForChange)
                .filter(p => p !== 'settings')
                .filter(p => p !== 'pluginManager')
                .map(p => (
                  <Icon
                    kind={verticalIconsPlugin.targetProfileForChange[p].kind}
                    displayName={
                      verticalIconsPlugin.targetProfileForChange[p].displayName
                    }
                    documentation={
                      verticalIconsPlugin.targetProfileForChange[p]
                        .documentation
                    }
                    icon={verticalIconsPlugin.targetProfileForChange[p].icon}
                    name={verticalIconsPlugin.targetProfileForChange[p].name}
                    tooltip={
                      verticalIconsPlugin.targetProfileForChange[p].tooltip
                    }
                    verticalIconPlugin={verticalIconsPlugin}
                    contextMenuAction={itemContextAction}
                    key={
                      verticalIconsPlugin.targetProfileForChange[p].displayName
                    }
                  />
                ))
            : null}  
          <OtherIcons>
            {Object.keys(verticalIconsPlugin.targetProfileForChange)
              .filter(p => p === 'none')
              .map(p => (
                <Icon
                  kind={verticalIconsPlugin.targetProfileForChange[p].kind}
                  displayName={
                    verticalIconsPlugin.targetProfileForChange[p].displayName
                  }
                  documentation={
                    verticalIconsPlugin.targetProfileForChange[p].documentation
                  }
                  icon={verticalIconsPlugin.targetProfileForChange[p].icon}
                  name={verticalIconsPlugin.targetProfileForChange[p].name}
                  tooltip={
                    verticalIconsPlugin.targetProfileForChange[p].tooltip
                  }
                  verticalIconPlugin={verticalIconsPlugin}
                  contextMenuAction={itemContextAction}
                  key={
                    verticalIconsPlugin.targetProfileForChange[p].displayName
                  }
                />
              ))}
          </OtherIcons>
          </div>
          {scrollableRef.current && scrollableRef.current.scrollHeight > scrollableRef.current.clientHeight 
            ? <i className="fa fa-chevron-double-down remixui_icon-chevron m-3"></i> 
            : null
          }
          {verticalIconsPlugin.targetProfileForChange &&
          Object.keys(verticalIconsPlugin.targetProfileForChange).length ? (
            <Fragment>
              <Settings>
                <>
                  {Object.keys(verticalIconsPlugin.targetProfileForChange)
                    .filter(p => p === 'pluginManager')
                    .map(p => (
                      <Icon
                        kind={
                          verticalIconsPlugin.targetProfileForChange[p].kind
                        }
                        displayName={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .displayName
                        }
                        documentation={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .documentation
                        }
                        icon={
                          verticalIconsPlugin.targetProfileForChange[p].icon
                        }
                        name={
                          verticalIconsPlugin.targetProfileForChange[p].name
                        }
                        tooltip={
                          verticalIconsPlugin.targetProfileForChange[p].tooltip
                        }
                        verticalIconPlugin={verticalIconsPlugin}
                        contextMenuAction={itemContextAction}
                        key={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .displayName
                        }
                      />
                    ))}
                  {Object.keys(verticalIconsPlugin.targetProfileForChange)
                    .filter(p => p === 'settings')
                    .map(p => (
                      <Icon
                        kind={
                          verticalIconsPlugin.targetProfileForChange[p].kind
                        }
                        displayName={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .displayName
                        }
                        documentation={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .documentation
                        }
                        icon={
                          verticalIconsPlugin.targetProfileForChange[p].icon
                        }
                        name={
                          verticalIconsPlugin.targetProfileForChange[p].name
                        }
                        tooltip={
                          verticalIconsPlugin.targetProfileForChange[p].tooltip
                        }
                        verticalIconPlugin={verticalIconsPlugin}
                        contextMenuAction={itemContextAction}
                        key={
                          verticalIconsPlugin.targetProfileForChange[p]
                            .displayName
                        }
                      />
                    ))}
                </>
              </Settings>
            </Fragment>
          ) : null}
        </div>
      </div>
  )
}