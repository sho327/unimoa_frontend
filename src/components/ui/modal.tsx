"use client";

import React from "react";
import { X } from "lucide-react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidthClassName?: string;
    className?: string;
};

/**
 * 共通モーダルコンポーネント
 * DaisyUI の modal スタイルをベースにしており、ヘッダー・ボディ・フッターを任意に構成できます。
 */
export function Modal({
    open,
    onClose,
    title,
    children,
    footer,
    maxWidthClassName = "max-w-md",
    className,
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="modal modal-open">
            <div className={`modal-box rounded-xl bg-white relative p-0 ${maxWidthClassName} ${className ?? ""}`}>
                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg text-secondary hover:bg-gray-100 hover:text-neutral transition-all z-[10]"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-6">
                    {title && <h3 className="font-black text-neutral text-lg mb-4 border-b border-gray-200 pb-4">{title}</h3>}
                    {children}
                    {footer && <div className="modal-action">{footer}</div>}
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}
