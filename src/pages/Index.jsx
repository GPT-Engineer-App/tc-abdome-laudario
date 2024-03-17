import React, { useState } from "react";
import { Box, Heading, Text, VStack, Grid, Button, Textarea, useToast } from "@chakra-ui/react";

const regioes = {
  abdome: ["Fígado e vias biliares", "Pâncreas", "Baço", "Rins e ureteres", "Intestinos", "Vasos", "Linfonodos"],
  pelve: ["Bexiga", "Próstata", "Útero e anexos", "Reto e canal anal"],
  cranio: ["Extra-axial", "Intra-axial supratentorial", "Intra-axial infratentorial", "Base do crânio", "Órbitas"],
};

const achados = {
  "Fígado e vias biliares": ["Sem alterações", "Esteatose", "Nódulos", "Cistos", "Dilatação das vias biliares"],
  Pâncreas: ["Sem alterações", "Alterações císticas", "Alterações sólidas"],
  Baço: ["Sem alterações", "Esplenomegalia", "Lesões focais"],
  "Rins e ureteres": ["Sem alterações", "Cistos", "Litíase", "Hidronefrose", "Lesões sólidas"],
  Intestinos: ["Sem alterações", "Espessamento parietal", "Distensão de alças"],
  Vasos: ["Sem alterações", "Ateromatose", "Aneurismas", "Trombos"],
  Linfonodos: ["Sem linfonodomegalias", "Linfonodomegalias"],
  Bexiga: ["Sem alterações", "Espessamento parietal", "Lesões vegetantes"],
  Próstata: ["Sem alterações", "Aumento volumétrico", "Lesões sólidas"],
  "Útero e anexos": ["Sem alterações", "Miomas", "Cistos ovarianos", "Lesões sólidas anexiais"],
  "Reto e canal anal": ["Sem alterações", "Espessamento parietal", "Lesões polipóides/vegetantes"],
  "Extra-axial": ["Sem alterações", "Coleções extra-axiais", "Lesões expansivas extra-axiais"],
  "Intra-axial supratentorial": ["Sem alterações", "Lesões expansivas", "Áreas de isquemia/gliose", "Calcificações"],
  "Intra-axial infratentorial": ["Sem alterações", "Lesões expansivas", "Áreas de isquemia/gliose"],
  "Base do crânio": ["Sem alterações", "Lesões líticas", "Lesões blásticas"],
  Órbitas: ["Sem alterações", "Proptose", "Lesões expansivas"],
};

const Index = () => {
  const [laudo, setLaudo] = useState("");
  const toast = useToast();

  const handleAchadoClick = (achado) => {
    setLaudo((prevLaudo) => prevLaudo + achado + "\n");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(laudo);
    toast({
      title: "Laudo copiado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="1200px" margin="auto" padding={8}>
      <Heading as="h1" mb={8}>
        Laudário de TC
      </Heading>

      <Grid templateColumns="1fr 2fr" gap={8}>
        <VStack align="stretch" spacing={8}>
          {Object.entries(regioes).map(([regiao, subregioes]) => (
            <Box key={regiao}>
              <Heading as="h2" size="lg" mb={4} textTransform="uppercase">
                {regiao}
              </Heading>
              {subregioes.map((subregiao) => (
                <Box key={subregiao} mb={4}>
                  <Heading as="h3" size="md" mb={2}>
                    {subregiao}
                  </Heading>
                  <VStack align="stretch">
                    {achados[subregiao].map((achado) => (
                      <Button key={achado} onClick={() => handleAchadoClick(`${subregiao}: ${achado}. `)} colorScheme="blue" size="sm" variant="outline">
                        {achado}
                      </Button>
                    ))}
                  </VStack>
                </Box>
              ))}
            </Box>
          ))}
        </VStack>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Laudo
          </Heading>
          <Textarea value={laudo} onChange={(e) => setLaudo(e.target.value)} height="70vh" mb={4} />
          <Button onClick={handleCopyClick} colorScheme="green">
            Copiar Laudo
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Index;
