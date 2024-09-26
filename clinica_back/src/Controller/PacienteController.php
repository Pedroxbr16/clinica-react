<?php

namespace App\Controller;

use App\Entity\Paciente;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PacienteController extends AbstractController
{
    #[Route('/api/paciente', name: 'create_paciente', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        try {
            $data = $request->getContent();
            $paciente = $serializer->deserialize($data, Paciente::class, 'json');

            // Validando o objeto Paciente
            $errors = $validator->validate($paciente);
            if (count($errors) > 0) {
                return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($paciente);
            $entityManager->flush();

            return $this->json(['status' => 'Paciente criado com sucesso'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
