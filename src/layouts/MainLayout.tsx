import React, { FC } from 'react'
import { GoBackBtn } from '../components/GoBackBtn'
import { UserMenu } from '../components/UserMenu'

interface MainLayoutProps {
    title: string
    subtitle?: string
    children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ title, subtitle, children }) => (
    <div className="p-3 px-md-5 py-md-4">
        <div className="row">
            <div className="col h-100">
                <GoBackBtn />
            </div>
            <h1 className="col-8 text-center">{title}</h1>
            <UserMenu className="col text-end" />
        </div>
        {subtitle && (
            <div className="py-3 text-center">
                <p>{subtitle}</p>
            </div>
        )}
        {children}
    </div>
)

export default MainLayout
