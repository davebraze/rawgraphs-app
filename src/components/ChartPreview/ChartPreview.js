import React, { useRef, useEffect } from "react"
import { chart as rawChart } from "@raw-temp/rawgraphs-core"
import useDebounce from "../../hooks/useDebounce"

const ChartPreview = ({ chart, dataset: data, dataTypes, mapping, visualOptions, error, setError, setRawViz }) => {

  const domRef = useRef(null)

  const vizOptionsDebounced = useDebounce(visualOptions, 200)

  useEffect(() => {
    console.info("Updating viz")
    try {
      setError(null)
      const viz = rawChart(chart, {
        data,
        mapping: mapping,
        dataTypes,
        visualOptions: vizOptionsDebounced
      })
      const rawViz = viz.renderToDOM(domRef.current)
      setRawViz(rawViz)
      
    } catch (e) {
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild)
      }
      console.log({ e })
      setError(e)
      setRawViz(null)
      
    }
  }, [chart, data, mapping, dataTypes, setError, vizOptionsDebounced, setRawViz])

  return (
    <>
      <div ref={domRef}>
        {/* Don't put content in this <div /> */}
      </div>
      {error !== null && (
        <div className="error-message">
          {error.message}
        </div>
      )}
    </>
  )
}

export default ChartPreview