"use client";

import {
  Background,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
} from "@once-ui-system/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../lib/validations";
import * as z from "zod";

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema as any),
    mode: "onTouched",
  });

  const commentValue = watch("comments", "");
  const watchAll = watch();

  const onSubmit = (data: ContactFormData) => {
    alert("Form submitted successfully!");
    console.log("Form Submitted:", data);
  };

  return (
    <Flex
      className="mt-10 md:mt-0"
      fillWidth
      direction="column"
      horizontal="center"
      paddingY="160"
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      <Background
        top="5%"
        left="-10%"
        style={{
          position: "absolute",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />

      <Heading
        variant="display-strong-xl"
        style={{ position: "absolute", top: "0px", left: "0px" }}
      >
        Contact
      </Heading>

      <Flex direction="column" horizontal="center" marginBottom="80" gap="24">
        <Heading variant="display-default-m" style={{ fontWeight: 600 }}>
          Get in touch
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-medium"
          className="max-w-[30ch] md:max-w-[25ch] mx-auto text-center lg:max-w-none lg:mx-0 lg:text-left"
        >
          Just fill out the form and I'll get back to you as soon as possible.
        </Text>
      </Flex>

      <Flex direction="column" maxWidth={48} fillWidth paddingX="24" gap="48">
        <Flex
          direction="column"
          gap="32"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Row */}
          <Flex direction="column" gap="8">
            <Text variant="label-default-s" className="text-white">
              Name{" "}
              {(errors.firstName || errors.lastName) && (
                <Text as="span" style={{ color: "#FF4D4D" }}>
                  (Required)
                </Text>
              )}
            </Text>
            <Grid columns={2} gap="16" s={{ columns: 1 }}>
              <Input
                {...register("firstName")}
                radius="none"
                id="contact-first-name"
                label="First"
                style={{ width: "100%" }}
                value={watchAll.firstName || ""}
              />
              <Input
                {...register("lastName")}
                radius="none"
                id="contact-last-name"
                label="Last"
                style={{ width: "100%" }}
                value={watchAll.lastName || ""}
              />
            </Grid>
          </Flex>

          {/* Email Row */}
          <Flex direction="column" gap="8">
            <Text variant="label-default-s" className="text-white">
              Email{" "}
              {errors.email || errors.confirmEmail ? (
                <Text as="span" style={{ color: "#FF4D4D" }}>
                  (
                  {errors.confirmEmail?.message ||
                    errors.email?.message ||
                    "Required"}
                  )
                </Text>
              ) : null}
            </Text>
            <Grid columns={2} gap="16" s={{ columns: 1 }}>
              <Input
                {...register("email")}
                radius="none"
                id="contact-email"
                label="Enter Email"
                type="email"
                style={{ width: "100%" }}
                value={watchAll.email || ""}
              />
              <Input
                {...register("confirmEmail")}
                radius="none"
                id="contact-confirm-email"
                label="Confirm Email"
                type="email"
                style={{ width: "100%" }}
                value={watchAll.confirmEmail || ""}
              />
            </Grid>
          </Flex>

          {/* Comments Area */}
          <Flex direction="column" gap="8">
            <Text variant="label-default-s" className="text-white">
              Comments{" "}
              {errors.comments ? (
                <Text as="span" style={{ color: "#FF4D4D" }}>
                  ({errors.comments?.message || "Required"})
                </Text>
              ) : null}
            </Text>
            <Text
              variant="body-default-s"
              onBackground="neutral-medium"
              marginBottom="8"
            >
              Please let us know what's on your mind.
            </Text>
            <textarea
              {...register("comments")}
              style={{
                minHeight: "200px",
                width: "100%",
                padding: "16px",
                borderRadius: "0px",
                border: errors.comments
                  ? "1px solid #FF4D4D"
                  : "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
                color: "white",
                resize: "vertical",
              }}
            />
            <Flex horizontal="between">
              <Text variant="label-default-xs" onBackground="neutral-medium">
                {commentValue?.length} of 800 max characters
              </Text>
            </Flex>
          </Flex>

          <Flex>
            <Button
              variant="primary"
              size="l"
              type="submit"
              style={{
                backgroundColor: "#FF4D4D",
                paddingLeft: "48px",
                paddingRight: "48px",
                borderRadius: "0px",
              }}
            >
              SUBMIT
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
