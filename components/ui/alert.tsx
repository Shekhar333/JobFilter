import * as React from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "warning" | "success" | "info";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const getAlertVariantClasses = (variant: AlertVariant = "default") => {
  const baseClasses =
    "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7";

  const variantClasses = {
    default: "bg-background text-foreground border-slate-200",
    destructive:
      "border-red-500/50 bg-red-50 text-red-800 [&>svg]:text-red-600",
    warning:
      "border-orange-500/50 bg-orange-50 text-orange-800 [&>svg]:text-orange-600",
    success:
      "border-green-500/50 bg-green-50 text-green-800 [&>svg]:text-green-600",
    info: "border-blue-500/50 bg-blue-50 text-blue-800 [&>svg]:text-blue-600",
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(getAlertVariantClasses(variant), className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
