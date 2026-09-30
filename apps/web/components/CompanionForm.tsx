"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea";
import { subjects } from "@/constants/index";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.number().min(1, { message: "Duration is required" }),

})
const CompanionForm = () => {

  const form = useForm<
    z.input<typeof formSchema>,
    any,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15
    },
  });

  const onSubmit = (values: z.output<typeof formSchema>) => {
    console.log(values);
  }


  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-name">
                  Companion Name
                </FieldLabel>

                <Input
                  {...field}
                  id="companion-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter companion name"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Subject */}
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-subject">
                  Subject
                </FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Topic */}
          <Controller
            name="topic"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-topic">
                  What should the companion help with?
                </FieldLabel>
                {/* 
                <Input
                  {...field}
                  id="companion-topic"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Algebra"
                  autoComplete="off"
                /> */}

                <Textarea
                  {...field}
                  placeholder="Ex. Derivatives and Integrals"
                // className="input"

                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Voice */}
          <Controller
            name="voice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-voice">
                  Voice
                </FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue
                      placeholder="Select the voice"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      Male
                    </SelectItem>
                    <SelectItem value="female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Style */}
          <Controller
            name="style"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-style">
                  Style
                </FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue
                      placeholder="Select the style"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">
                      Formal
                    </SelectItem>
                    <SelectItem value="casual">
                      Casual
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Duration */}
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companion-duration">
                  Duration
                </FieldLabel>

                <Input
                  {...field}
                  id="companion-duration"
                  type="number"
                  min={1}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className={"w-full cursor-pointer"}>
            Build Your Companion
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}

export default CompanionForm