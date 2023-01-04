import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  if (process.env.NODE_ENV === "production") {
    app.enableCors({
      origin: [
        "http://localhost:8080",
        "3.75.158.163",
        "3.125.183.140",
        "35.157.117.28",
      ],
    });
  } else {
    app.enableCors();
  }

  const config = new DocumentBuilder()
    .setTitle("Hourslipper API")
    .setDescription("This is the API for Hourslipper")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
