import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Uncaught error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <div className="text-center text-red-500">Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
