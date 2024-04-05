"use client"
import { Button, Result } from 'antd'
import React from 'react'

const FailPayment = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
      }}
    >
      <Result
        status="error"
        title={`Thanh toán thất bại`}
        extra={[
          <Button type="primary" key="ok" onClick={() => null}>
            OK
          </Button>,
        ]}
      />
    </div>
  )
}

export default FailPayment
